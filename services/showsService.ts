import { CallbackError, ObjectId } from "mongoose";
import { EpisodeType, ShowType } from "../misc/types";
import Episode from "../models/Episode";
import Show from "../models/Show";

// -----
// SHOWS
// -----

const getShows = (): Promise<{ message: string; status: number; shows?: ShowType[] }> => {
    return new Promise((res, rej) => {
        try {
            Show.find({})
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

const removeShowByID = (id: string): Promise<{ message: string; status: number }> => {
    return new Promise((res, rej) => {
        try {
            Show.findByIdAndDelete(id, {}, (err: CallbackError, show) => {
                if (err) throw err;
                if (!show) rej({ message: "Este show no existe", status: 404 });
                res({ message: "Show eliminado con éxito", status: 200 });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

const editShow = (id: string, data: ShowType): Promise<{ message: string; status: number }> => {
    Object.keys(data).forEach((key) => {
        if (data[key] === "") delete data[key];
    });

    return new Promise((res, rej) => {
        try {
            Show.findOneAndUpdate({ _id: id }, { $set: data }, {}, (err: CallbackError, show) => {
                if (err) throw err;
                if (!show) rej({ message: "Este show no existe", status: 404 });

                res({ message: "Show editado con exito", status: 200 });
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
            const newEpisode = new Episode(data);
            newEpisode.save((err, episode: EpisodeType) => {
                if (err) throw err;
                Show.findOneAndUpdate({ _id: targetShow }, { $push: { episodes: episode._id } }, {}, (err, show) => {
                    if (err) throw err;
                    if (!show) rej({ message: "Este show no existe", status: 404 });
                    res({ message: "Episodio añadido con éxito", status: 201 });
                });
            });
        } catch (err) {
            rej({ message: "Error al consultar la base de datos", status: 500 });
        }
    });
};

export default { editShow, createShow, getShows, getShowByID, removeShowByID, createNewEpisode };
