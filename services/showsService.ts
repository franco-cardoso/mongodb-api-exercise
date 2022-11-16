import mongoose, { CallbackError } from "mongoose";
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
                .select({ title: 1, description: 1, coverPic: 1 })
                .exec((err: CallbackError, shows: ShowType[]) => {
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
            Show.findById(id, (err: CallbackError, show: ShowType) => {
                if (err) throw err;
                if (!show) rej({ message: "Este show no existe", status: 404 });
                res({ message: "", status: 200, show: show });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

/**
 * Esta función, junto con editEntry, lleva exactamente el mismo codigo tanto para episodios
 * como para shows, asi que reciben un parámetro extra 'model' para no tener que repetir el
 * código solo para cambiar la colección
 */
const removeEntry = (id: string, model: string): Promise<{ message: string; status: number }> => {
    return new Promise((res, rej) => {
        try {
            const chosenModel = model === "Show" ? Show : model === "Episode" ? Episode : undefined;
            if (!chosenModel) throw new Error("Invalid model");

            chosenModel.findByIdAndDelete(id, {}, (err: CallbackError, show) => {
                if (err) throw err;
                if (!show) rej({ message: "Esta entrada no existe en la base de datos", status: 404 });
                res({ message: "Entrada eliminada con éxito", status: 200 });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

const editEntry = (id: string, model: string, data: ShowType): Promise<{ message: string; status: number }> => {
    Object.keys(data).forEach((key) => {
        if (data[key] === "") delete data[key];
    });

    return new Promise((res, rej) => {
        const collection = model === "Show" ? Show : model === "Episode" ? Episode : null;
        if (!collection) throw new Error("Invalid model");

        try {
            Show.findOneAndUpdate({ _id: id }, { $set: data }, {}, (err: CallbackError, show) => {
                if (err) throw err;
                if (!show) rej({ message: "Esta entrada no existe", status: 404 });

                res({ message: "Entrada editada con éxito", status: 200 });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

const createShow = (data: ShowType): Promise<{ message: string; id?: string; status: number }> => {
    return new Promise((res, rej) => {
        try {
            Show.findOne({ title: data.title }, (err: CallbackError, show: ShowType) => {
                if (err) throw err;
                if (show) return rej({ message: "Ya existe un show con este título", status: 409 });
                const newShow = new Show(data);
                newShow.save((err, show) => {
                    if (err) throw err;
                    res({ message: "Show creado con exito", id: show._id, status: 201 });
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
            Show.findOne({ _id: targetShow }, {}, (err, show) => {
                if (err) throw err;
                if (!show) return rej({ message: "Este show no existe", status: 404 });
                
                const newEpisode = new Episode(data);
                newEpisode.save((err, episode) => {
                    if (err) throw err;
                    show.update({ $push: { episodes: episode._id } });
                    res({ message: "Episodio añadido con éxito", status: 201 });
                });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

export default { editEntry, createShow, getShows, getShowByID, removeEntry, createNewEpisode };
