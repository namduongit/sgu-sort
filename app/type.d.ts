export type Khoa = {
    ma: string;
    ten: string;
}

export type Lop = {
    ma: string;
    ten: string;
}

export type MonHoc = {
    ma: string;
    ten: string;
    ten_eg: null | string;
}

export type NhomTo = {
    id_to_hoc: string;
    id_mon: string;
    ma_mon: string;
    ten_mon_eg: null | string;
    so_tc: string;
    so_tc_so: {};
    is_vuot: boolean;
    nhom_to: string;
    to: string;
    lop: string;
    ds_lop: string[];
    ds_khoa: string[];
    is_kdk: boolean;
    sl_dk: number;
    sl_cp: number;
    sl_cl: number;
    tkb: string;
    is_hl: boolean;
    enable: boolean;
    hauk: boolean;
    is_dk: boolean;
    gc_enable: string;
    is_rot: boolean;
    is_ctdt: boolean;
    is_chctdt: boolean;
    is_kg_lt: boolean;
    thu: number;
    tbd: number;
    so_tiet: number;
    is_kg_huy_kqdk: boolean;
    is_kg_xet_trungtkb: boolean;
    sl_nghi_day: number;
    sl_day_bu: number;
    is_day_bu: boolean;
}

export type LocDSNhomTo = {
    loai_hien_thi_tuan: number;
    is_merge_to_hoc: boolean;
    is_bb_chon_nhomto: boolean;
    data: {
        total_items: number;
        total_pages: number;
        dien_giai_enable_chung: string;
        ghi_chu_dkmh: string;
        trong_thoi_gian_dang_ky: boolean;
        trong_thoi_gian_duyet_kqdk: boolean;
        hien_cot_tach_phieu_nop_tien: boolean;
        addin_duyet_kqdk: boolean;
        hien_cot_hoc_phi: boolean;
        hien_cot_ma_lop: boolean;
        hien_cot_so_luong: boolean;
        hien_thi_cot_lich_thi: boolean;
        hoc_ky_dang_ky: string;
        is_show_tietbd: boolean;
        is_merge_dong_tkbhk: boolean;
        ds_khoa: Khoa[];
        ds_lop: Lop[];
        ds_mon_hoc: MonHoc[];
        ds_nhom_to: NhomTo[];
    }
}

export type Period = {
    id: string;
    name: string;
    numberOfCredit: string;
    group: string;

    class: {
        schedule: Record<number, {
            start: number;
            end: number;
        }>;
        teachers: string[];
        positions: string[];
    };

    sl_cp: number;
    sl_dk: number;
    sl_cl: number;
}

export type Calendar = {
    val: number;
    subject: Period | null;
}
