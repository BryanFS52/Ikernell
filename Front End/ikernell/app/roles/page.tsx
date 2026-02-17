"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Rol } from "@/types/rol";
import { getRoles} from "@/services/rol.service";

export default function RolesPage() {
    const router = useRouter();
    const [roles, setRoles] = useState<Rol[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarRoles();
    }, []);

    async function cargarRoles() {
        setLoading(true);
        const data = await getRoles();
        setRoles(data);
        setLoading(false);
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando roles</p>;
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-4">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th className="text-center">Roles</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((r) => (
                        <tr key={r.idRol}>
                            <td className="text-center">{r.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}