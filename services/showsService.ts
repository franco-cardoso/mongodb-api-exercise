import mongoose, { CallbackError, HydratedDocument, Model, Schema, SchemaType, Types } from "mongoose";
import { EpisodeType, ShowType } from "../misc/types";
import Episode from "../models/Episode";
import Show from "../models/Show";
// -----
// SHOWS
// -----

const getShows = (search: string | undefined): Promise<{ message: string; status: number; shows?: ShowType[] }> => {
    const searchQuery: RegExp | null = search ? new RegExp(search, "i") : null;

    return new Promise((res, rej) => {
        try {
            Show.find(searchQuery ? { title: { $regex: searchQuery } } : {})
                .select({ title: 1, description: 1, coverImg: 1 })
                .exec((err, shows: HydratedDocument<ShowType>[]) => {
                    if (err) throw err;
                    res({ message: "", status: 200, shows: shows });
                });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

const getShowByID = (id: string): Promise<{ message: string; status: number; show?: ShowType }> => {
    return new Promise((res, rej) => {
        try {
            Show.findById(id, {}, (err, show: HydratedDocument<ShowType>) => {
                if (err) throw err;
                if (!show) rej({ message: "Este show no existe", status: 404 });
                res({ message: "", status: 200, show: show });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

/*

{
  "_id": {
    "$oid": "63755576c36c0d47d87bba36"
  },
  "title": "zcvzvczxcvxvwes",
  "description": "wdasdawdasd",
  "coverImg": "https://projectzomboid.com/blog/content/uploads/2022/11/polaris.png",
  "type": "OVA",
  "category": "Ecchi",
  "episodes": [
    {
      "$oid": "6375557fc36c0d47d87bba39"
    },
    {
      "$oid": "63755580c36c0d47d87bba3d"
    },
    {
      "$oid": "63755581c36c0d47d87bba41"
    },
    {
      "$oid": "63755581c36c0d47d87bba45"
    }
  ],
  "__v": 0
}

*/
const deleteShow = (id: string): Promise<{ message: string; status: number }> => {
    return new Promise((res, rej) => {
        try {
            Show.findById(id, {}, (err, show: HydratedDocument<ShowType>) => {
                if (err) throw err;
                if (!show) return rej({ message: "Este show no existe", status: 404 });

                show.deleteOne();

                Episode.deleteMany({ _id: { $in: show.episodes } }, {}, (err) => {
                    if (err) throw err;
                    res({ message: "Show eliminado con éxito", status: 200 });
                });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

/**
 * Esta función lleva exactamente el mismo código tanto para episodios
 * como para shows, asi que recibe un parámetro extra 'model' para no tener que repetir el
 * código solo para cambiar la colección
 */
const editEntry = (id: string, model: string, data: ShowType): Promise<{ message: string; status: number }> => {
    Object.keys(data).forEach((key) => {
        if (data[key] === "") delete data[key];
    });

    return new Promise((res, rej) => {
        const chosenModel: any = model === "Show" ? Show : model === "Episode" ? Episode : undefined;
        if (chosenModel === undefined) throw new Error("Invalid model");

        try {
            chosenModel.findOneAndUpdate(
                { _id: id },
                { $set: data },
                {},
                (err: CallbackError, show: HydratedDocument<ShowType> | HydratedDocument<EpisodeType>) => {
                    if (err) throw err;
                    if (!show) rej({ message: "Esta entrada no existe", status: 404 });

                    res({ message: "Entrada editada con éxito", status: 200 });
                }
            );
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

const createShow = (data: ShowType): Promise<{ message: string; id?: string | Types.ObjectId; status: number }> => {
    return new Promise((res, rej) => {
        try {
            Show.findOne({ title: data.title }, {}, (err, show: HydratedDocument<ShowType>) => {
                if (err) throw err;
                if (show) return rej({ message: "Ya existe un show con este título", status: 409 });

                const newShow = new Show(data);
                newShow.save((err, savedShow: HydratedDocument<ShowType>) => {
                    if (err) throw err;
                    res({ message: "Show creado con exito", id: savedShow._id, status: 201 });
                });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

// --------
// EPISODES
// --------

const createNewEpisode = (data: EpisodeType, targetShow: string): Promise<{ message: string; status: number }> => {
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
                        res({ message: "Episodio añadido con éxito", status: 201 });
                    });
                });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

const deleteEpisode = (id: string, showID: string): Promise<{ message: string; status: number }> => {
    return new Promise((res, rej) => {
        try {
            Episode.findById(id, {}, (err, episode: HydratedDocument<EpisodeType>) => {
                if (err) throw err;
                if (!episode) return rej({ message: "Este episodio no existe", status: 404 });

                Show.findById(showID, {}, (err, show: HydratedDocument<ShowType>) => {
                    if (err) throw err;
                    if (!show) return rej({ message: "Este show no existe", status: 404 });

                    episode.deleteOne();
                    show.updateOne({ episodes: show.episodes.filter((item) => String(item) !== String(episode._id)) }, {}, (err) => {
                        if (err) throw err;
                        res({ message: "Episodio eliminado con éxito", status: 200 });
                    });
                });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

export default { editEntry, createShow, getShows, getShowByID, deleteShow, createNewEpisode, deleteEpisode };
