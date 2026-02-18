"use client";

import { useEffect, useState } from "react";
import { Rol } from "@/types/rol";
import { PersonaFormData, Persona } from "@/types/persona";
import { useRouter } from "next/navigation";
import { crearPersona, actualizarPersona, getPersona } from "@/services/persona.service";

export type PersonaFormProps = {
  initialData?: Persona;
  mode: "crear" | "editar";
  onSuccess: () => void;
};

export default function PersonaForm({
  initialData,
  mode,
  onSuccess
}: PersonaFormProps) {
  const [roles, setRoles] = useState<Rol[]>([]);
  const router = useRouter();

  const initialForm: PersonaFormData = {
    nombre: "",
    apellido: "",
    documento: "",
    direccion: "",
    profesion: "",
    especialidad: "",
    estado: true,
    password: "",
    foto: "",
    idRol: ""
  };

  const [form, setForm] = useState<PersonaFormData>(initialForm);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/roles")
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (initialData) {

      setForm({
        nombre: initialData.nombre || "",
        apellido: initialData.apellido || "",
        documento: initialData.documento || "",
        direccion: initialData.direccion || "",
        profesion: initialData.profesion || "",
        especialidad: initialData.especialidad || "",
        estado: initialData.estado ?? true,
        password: initialData.password || "",
        foto: initialData.foto || "",
        idRol: initialData.rol?.idRol?.toString() || "",
      });
    }
  }, [initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  // Función para validar documento único
  async function validateDocumentoUnico(documento: string): Promise<boolean> {
    if (!documento) return true;
    
    try {
      const personas = await getPersona();
      const documentoExiste = personas.some((p: Persona) => 
        p.documento === documento && 
        (mode === "crear" || p.idPersona !== initialData?.idPersona)
      );
      return !documentoExiste;
    } catch (error) {
      console.error("Error al validar documento:", error);
      return true; // En caso de error, permitir continuar
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nombre || !form.apellido || !form.documento || !form.idRol) {
      alert("Complete los campos obligatorios");
      return;
    }

    // Validar documento único
    const documentoValido = await validateDocumentoUnico(form.documento);
    if (!documentoValido) {
      alert("Ya existe una persona con este número de documento. Por favor, ingrese un documento único.");
      return;
    }

    const formData = new FormData();

    formData.append("nombre", form.nombre);
    formData.append("apellido", form.apellido);
    formData.append("documento", form.documento);
    formData.append("direccion", form.direccion || "");
    formData.append("profesion", form.profesion || "");
    formData.append("especialidad", form.especialidad || "");
    formData.append("estado", String(form.estado));
    formData.append("idRol", form.idRol);

    if (form.password) {
      formData.append("password", form.password);
    }

    if (file) {
      formData.append("foto", file);
    }

    try {
      if (mode === "crear") {
        await fetch("http://localhost:8080/api/personas", {
          method: "POST",
          body: formData,
        });
        alert("Persona creada correctamente");
      } else if (mode === "editar" && initialData?.idPersona) {
        await fetch(`http://localhost:8080/api/personas/${initialData.idPersona}`, {
          method: "PUT",
          body: formData,
        });
        alert("Persona actualizada correctamente");
      }


      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error al guardar persona");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container flex flex-col gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <input
        name="nombre" value={form.nombre} placeholder="Nombre" onChange={handleChange} required
      />
      <input
        name="apellido" value={form.apellido} placeholder="Apellido" onChange={handleChange} required
      />
      <input
        name="documento" value={form.documento} placeholder="Documento" onChange={handleChange} required
      />
      <input
        name="direccion" value={form.direccion} placeholder="Dirección" onChange={handleChange}
      />
      <input
        name="profesion" value={form.profesion} placeholder="Profesión" onChange={handleChange}
      />
      <input
        name="especialidad" value={form.especialidad} placeholder="Especialidad" onChange={handleChange}
      />

      <input
        name="password" value={form.password} placeholder={mode === "editar" ? "Nueva contraseña (dejar vacío para mantener)" : "Contraseña"} type="password" onChange={handleChange} required={mode === "crear"}
      />

      <select name="idRol" value={form.idRol} onChange={handleChange} required>
        <option value="">Seleccione un rol</option>
        {roles.map((r) => (
          <option key={r.idRol} value={r.idRol}>
            {r.nombre}
          </option>
        ))}
      </select>

      <button type="submit" className="btn-primary">
        {mode === "crear" ? "Crear" : "Guardar"}
      </button>
    </form>
  );
}
