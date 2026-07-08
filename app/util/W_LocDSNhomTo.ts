import { Khoa, LocDSNhomTo, Lop, MonHoc, NhomTo } from "../type";

export class W_LocDSNhomTo {
    public ds: LocDSNhomTo;

    public ds_khoa: Khoa[];
    public ds_lop: Lop[];
    public ds_mon_hoc: MonHoc[];
    public ds_nhom_to: NhomTo[];

    private initialize(): LocDSNhomTo {
        const data: LocDSNhomTo = require("../../resources/w-locdsnhomto.json");
        return data;
    }

    constructor() {
        const data = this.initialize();
        this.ds = data;
        this.ds_khoa = data.data.ds_khoa;
        this.ds_lop = data.data.ds_lop;
        this.ds_mon_hoc = data.data.ds_mon_hoc;
        this.ds_nhom_to = data.data.ds_nhom_to;
    }
}