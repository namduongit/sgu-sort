'use client'

import { CALENDAR_LIST, TIME_TABLE_VISIT } from "../config/localStorage";
import { Calendar } from "../type";

type CalendarItem = {
    id: string;
    name?: string;
    cal: Calendar[][];
}

export const getCals = (): CalendarItem[] => {
    const local = localStorage.getItem(CALENDAR_LIST);
    if (!local) return [];

    try {
        const parsed: CalendarItem[] = JSON.parse(local);
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch (e) {
        return [];
    }
}

export const getCalById = (id: string): CalendarItem | null => {
    const list = getCals();
    return list.find((item) => item.id === id) ?? null;
}

export const saveCal = (id: string, cal: Calendar[][], name?: string): boolean => {
    const list = getCals();
    const updated = [...list, { id, name, cal }];

    try {
        localStorage.setItem(CALENDAR_LIST, JSON.stringify(updated));
        return true;
    } catch (e) {
        return false;
    }
}

export const updateCal = (id: string, cal: Calendar[][], name?: string): boolean => {
    const list = getCals();
    const updated = list.map((item) => (item.id === id ? { ...item, name, cal } : item));

    try {
        localStorage.setItem(CALENDAR_LIST, JSON.stringify(updated));
        return true;
    } catch (e) {
        return false;
    }
}

export const deleteCal = (id: string): boolean => {
    const list = getCals();
    const updated = list.filter((item) => item.id !== id);

    try {
        localStorage.setItem(CALENDAR_LIST, JSON.stringify(updated));
        return true;
    } catch (e) {
        return false;
    }
}

export const hasVisitedTimeTable = (): boolean => {
    if (typeof window === "undefined") return false;

    try {
        return localStorage.getItem(TIME_TABLE_VISIT) === "true";
    } catch (e) {
        return false;
    }
}

export const markTimeTableVisited = (): void => {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(TIME_TABLE_VISIT, "true");
    } catch (e) {
        // Ignore storage errors
    }
}