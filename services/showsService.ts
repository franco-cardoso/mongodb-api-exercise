import { CallbackError, HydratedDocument, InferSchemaType, Model, Types } from "mongoose";
import { EpisodeType, ServiceResponse, ShowType } from "../misc/types";
import Episode from "../models/Episode";
import Show from "../models/Show";

// -----
// SHOWS
// -----
const getShowsBySearch = (search: string | undefined): Promise<ServiceResponse> => {
    // convierte el parametro 'search' a un regex, en caso de no existir 'search',
    // searchQuery va a ser undefined y la funcion va retorna todos los shows sin filtrar
    const searchQuery: RegExp | undefined = search ? new RegExp(search, "i") : undefined;

    return new Promise((res, rej) => {
        try {
            Show.find(
                searchQuery ? { title: { $regex: searchQuery } } : {},
                "title description coverImg",
                (err, shows: HydratedDocument<ShowType>[]) => {
                    if (err) throw err;
                    res({ message: "", status: 200, data: shows });
                }
            );
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500, error: err });
        }
    });
};

const getShowByID = (id: string): Promise<ServiceResponse> => {
    return new Promise((res, rej) => {
        try {
            Show.findById(id, "title description coverImg type category", (err, show: HydratedDocument<ShowType>) => {
                if (err) throw err;
                if (!show) rej({ message: "Este show no existe", status: 404 });
                res({ message: "", status: 200, data: show });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500, error: err });
        }
    });
};

const deleteShowByID = (id: string): Promise<ServiceResponse> => {
    return new Promise((res, rej) => {
        try {
            Show.findById(id, {}, (err, show: HydratedDocument<ShowType>) => {
                if (err) throw err;
                if (!show) return rej({ message: "Este show no existe", status: 404 });

                // elimina todos los episodios que se encuentren
                // dentro del array 'episodes', y elimina el show
                Episode.deleteMany({ _id: { $in: show.episodes } }, {}, (err) => {
                    if (err) throw err;
                    show.deleteOne();
                    res({ message: "Show eliminado con éxito", status: 200 });
                });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500, error: err });
        }
    });
};

// Esta función lleva exactamente el mismo código tanto para episodios
// como para shows, asi que recibe un parámetro extra 'model' para no tener que repetir el
// código solo para cambiar la colección
const editEntry = (id: string, model: string, data: ShowType): Promise<ServiceResponse> => {
    Object.keys(data).forEach((key) => {
        if (data[key] === "") delete data[key];
    });

    return new Promise((res, rej) => {
        try {
            const chosenModel: any = model === "Show" ? Show : model === "Episode" ? Episode : undefined;
            if (chosenModel === undefined) throw new Error("Invalid model");

            chosenModel.findOneAndUpdate(
                { _id: id },
                { $set: data },
                {},
                (err: CallbackError, show: HydratedDocument<ShowType | EpisodeType>) => {
                    if (err) throw err;
                    if (!show) rej({ message: "Esta entrada no existe", status: 404 });

                    res({ message: "Entrada editada con éxito", status: 200 });
                }
            );
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500, error: err });
        }
    });
};

const createNewShow = (data: ShowType): Promise<ServiceResponse> => {
    return new Promise((res, rej) => {
        try {
            Show.findOne({ title: data.title }, {}, (err, show: HydratedDocument<ShowType>) => {
                if (err) throw err;
                if (show) return rej({ message: "Ya existe un show con este título", status: 409 });

                const newShow = new Show(data);
                newShow.save((err, savedShow: HydratedDocument<ShowType>) => {
                    if (err) throw err;
                    res({ message: "Show creado con exito", data: savedShow._id, status: 201 });
                });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500, error: err });
        }
    });
};

// --------
// EPISODES
// --------

const getEpisodesByShowID = (id: string): Promise<ServiceResponse> => {
    return new Promise((res, rej) => {
        try {
            Show.findById(id, "episodes", (err, episodesArr: HydratedDocument<{ episodes: Types.ObjectId[] }>) => {
                if (err) throw err;
                Episode.find(
                    { _id: { $in: episodesArr.episodes } },
                    "title description",
                    (err, episodes: HydratedDocument<EpisodeType>[]) => {
                        if (err) throw err;
                        res({ message: "", status: 200, data: episodes });
                    }
                );
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500, error: err });
        }
    });
};

const createNewEpisode = (data: EpisodeType, targetShow: string): Promise<ServiceResponse> => {
    return new Promise((res, rej) => {
        try {
            Show.findOne({ _id: targetShow }, {}, (err, show: HydratedDocument<ShowType>) => {
                if (err) throw err;
                if (!show) return rej({ message: "Este show no existe", status: 404 });

                const newEpisode = new Episode(data);
                newEpisode.save((err, episode: HydratedDocument<EpisodeType>) => {
                    if (err) throw err;

                    show.updateOne({ $push: { episodes: episode._id } }, {}, (err) => {
                        if (err) throw err;
                        res({ message: "Episodio añadido con éxito", data: episode._id, status: 201 });
                    });
                });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500, error: err });
        }
    });
};

const deleteEpisodeByID = (id: string, showID: string): Promise<ServiceResponse> => {
    return new Promise((res, rej) => {
        try {
            Episode.findById(id, {}, (err, episode: HydratedDocument<EpisodeType>) => {
                if (err) throw err;
                if (!episode) return rej({ message: "Este episodio no existe", status: 404 });

                // encuentra el show correspondiente y elimina el episodio de su array
                // antes de eliminar el episodio en cuestión
                Show.findById(showID, {}, (err, show: HydratedDocument<ShowType>) => {
                    if (err) throw err;
                    if (!show) return rej({ message: "Este show no existe", status: 404 });
                    if (!show.episodes.includes(new Types.ObjectId(id))) {
                        return rej({ message: "Este episodio no existe en este show", status: 404 });
                    }

                    show.updateOne({ $pull: { episodes: new Types.ObjectId(episode._id) } }, {}, (err) => {
                        if (err) throw err;
                        episode.deleteOne();
                        res({ message: "Episodio eliminado con éxito", status: 200 });
                    });
                });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500, error: err });
        }
    });
};

export default {
    editEntry,
    createNewShow,
    getShowsBySearch,
    getShowByID,
    deleteShowByID,
    createNewEpisode,
    deleteEpisodeByID,
    getEpisodesByShowID,
};
