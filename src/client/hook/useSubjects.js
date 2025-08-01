import { useEffect, useState } from "react";
import { subjects } from "../services/subjectService";
import { getLocationToken, saveLocationToken } from "../utils/tokenManager";

const useSubjects = () => {
    const [data, setData] = useState({ ds_mon_hoc: [], ds_nhom_to: [] });
    const [loading, setLoading] = useState(true);

    const mergeDsNT = (data) => {
        if (!data) return [];
        const ds_nhom_to = data.ds_nhom_to.map(element => {
            const mon_hoc = data.ds_mon_hoc.find(sub => sub.ma === element.ma_mon);
            return {
                ...element,
                tenMH: mon_hoc?.ten || "Không rõ"
            };
        });
        return ds_nhom_to;
    };

    const initID = (data) => {
        if (!data) return {};
        const ds_mon_hoc = data.ds_mon_hoc.map((element, index) => {
            return {
                ...element,
                id: index
            }
        });
        const ds_nhom_to = data.ds_nhom_to.map((element, index) => {
            return {
                ...element,
                id: index
            }
        });
        return { ds_mon_hoc, ds_nhom_to };
    }


    useEffect(() => {
        const local = getLocationToken("CURRENT_SUBJECT");
        if (local) {
            local.data.ds_nhom_to = mergeDsNT(local.data);
            const { ds_mon_hoc, ds_nhom_to } = initID(local.data);
            local.data.ds_mon_hoc = ds_mon_hoc;
            local.data.ds_nhom_to = ds_nhom_to;
            setData(local.data || {});
            setLoading(false);
            return;
        }

        const CURRENT_USER = getLocationToken("CURRENT_USER");
        const access_token = CURRENT_USER?.access_token;

        async function fetchSubjects() {
            const result = await subjects(access_token);
            if (result.code === 200) {
                result.data.ds_nhom_to = mergeDsNT(result.data);
                const { ds_mon_hoc, ds_nhom_to } = initID(result.data);
                result.data.ds_mon_hoc = ds_mon_hoc;
                result.data.ds_nhom_to = ds_nhom_to;
                saveLocationToken("CURRENT_SUBJECT", result);
                setData(result.data || {});
            }
            setLoading(false);
        }

        fetchSubjects();
    }, []);

    return { data, loading };
};

export default useSubjects;