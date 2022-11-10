import { CallbackError } from "mongoose";
import { ShowType } from "../misc/types";
import Show from "../models/Show";

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
            rej({ message: "Error al recibir los datos", status: 500 });
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
            rej({ message: "Error al recibir los datos", status: 500 });
        }
    });
};

export default { getShows, getShowByID };