"use client";

import { useEffect, useState } from "react";
import { Rol } from "@/types/rol";
import { PersonaFormData, Persona } from "@/types/persona";
import { crearPersona, actualizarPersona } from "@/services/persona.service";

export type PersonaFormProps = {
  initialData?: Persona;
  mode: "crear" | "editar";
  onSuccess: () => void;
};

export default function PersonaForm({ initialData, mode, onSuccess }: PersonaFormProps) {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [form, setForm] = useState<PersonaFormData>({
    nombre: "",
    apellido: "",
    documento: "",
    direccion: "",
    profesion: "",
    especialidad: "",
    correo: "",
    estado: true,
    password: "",
    foto: "",
    fechaNacimiento: "",
    idRol: "",
  });
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
        correo: initialData.correo || "",
        estado: initialData.estado ?? true,
        password: "",
        foto: initialData.foto || "",
        fechaNacimiento: initialData.fechaNacimiento || "",
        idRol: initialData.rol?.idRol?.toString() || "",
      });
    }
  }, [initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      if (mode === "crear") {
        // Para crear: siempre usar multipart (el backend no tiene endpoint JSON para crear)
        const formData = new FormData();
        formData.append('nombre', form.nombre);
        formData.append('apellido', form.apellido);
        formData.append('documento', form.documento);
        formData.append('correo', form.correo || '');
        formData.append('idRol', form.idRol);
        
        if (form.direccion) formData.append('direccion', form.direccion);
        if (form.profesion) formData.append('profesion', form.profesion);
        if (form.especialidad) formData.append('especialidad', form.especialidad);
        if (form.password) formData.append('password', form.password);
        
        // Solo agregar foto si se seleccionó
        if (file) {
          formData.append('foto', file);
        }

        const response = await fetch("http://localhost:8080/api/personas", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        // Si hay fechaNacimiento, actualizar después (el endpoint multipart no la soporta)
        if (form.fechaNacimiento) {
          const personaCreada = await response.json();
          const updateData = {
            nombre: form.nombre,
            apellido: form.apellido,
            documento: form.documento,
            direccion: form.direccion,
            profesion: form.profesion,
            especialidad: form.especialidad,
            correo: form.correo,
            fechaNacimiento: form.fechaNacimiento,
            estado: true,
            rol: { idRol: parseInt(form.idRol) }
          };

          await fetch(`http://localhost:8080/api/personas/${personaCreada.idPersona}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData),
          });
        }
        
      } else {
        // Para editar
        if (file) {
          // Si hay foto nueva, usar endpoint multipart
          const formData = new FormData();
          formData.append('nombre', form.nombre);
          formData.append('apellido', form.apellido);
          formData.append('documento', form.documento);
          formData.append('correo', form.correo || '');
          formData.append('idRol', form.idRol);
          
          if (form.direccion) formData.append('direccion', form.direccion);
          if (form.profesion) formData.append('profesion', form.profesion);
          if (form.especialidad) formData.append('especialidad', form.especialidad);
          if (form.password) formData.append('password', form.password);
          formData.append('foto', file);

          const response = await fetch(`http://localhost:8080/api/personas/${initialData?.idPersona}`, {
            method: "PUT",
            body: formData,
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} - ${errorText}`);
          }

          // Actualizar fechaNacimiento después si se proporcionó
          if (form.fechaNacimiento) {
            const updateData = {
              nombre: form.nombre,
              apellido: form.apellido,
              documento: form.documento,
              direccion: form.direccion,
              profesion: form.profesion,
              especialidad: form.especialidad,
              correo: form.correo,
              fechaNacimiento: form.fechaNacimiento,
              estado: form.estado,
              rol: { idRol: parseInt(form.idRol) }
            };

            await fetch(`http://localhost:8080/api/personas/${initialData?.idPersona}`, {
              method: "PUT",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updateData),
            });
          }
        } else {
          // Si no hay foto nueva, usar endpoint JSON
          const personaData = {
            nombre: form.nombre,
            apellido: form.apellido,
            documento: form.documento,
            direccion: form.direccion,
            profesion: form.profesion,
            especialidad: form.especialidad,
            correo: form.correo,
            fechaNacimiento: form.fechaNacimiento,
            estado: form.estado,
            ...(form.password && { password: form.password }),
            rol: { idRol: parseInt(form.idRol) }
          };

          const response = await fetch(`http://localhost:8080/api/personas/${initialData?.idPersona}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(personaData),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} - ${errorText}`);
          }
        }
      }

      onSuccess();
    } catch (error) {
      console.error("Error al guardar persona:", error);
      alert(`Error al ${mode === "crear" ? "crear" : "actualizar"} persona. Por favor, intenta de nuevo.`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Foto de perfil */}
      <div className="text-center space-y-4">
        {form.foto && (
          <img 
            src={form.foto} 
            alt="Foto de perfil" 
            className="w-24 h-24 object-cover rounded-full border-4 border-gray-200 shadow-sm mx-auto" 
          />
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto de perfil
          </label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Nombre completo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apellido
          </label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Documento y fecha de nacimiento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Documento de identidad
          </label>
          <input
            name="documento"
            value={form.documento}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Dirección y correo electrónico */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Información profesional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profesión
          </label>
          <input
            name="profesion"
            value={form.profesion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Especialidad
          </label>
          <input
            name="especialidad"
            value={form.especialidad}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Rol y contraseña */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rol en el sistema
          </label>
          <select
            name="idRol"
            value={form.idRol}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Seleccione un rol</option>
            {roles.map(r => (
              <option key={r.idRol} value={r.idRol}>{r.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            name="password"
            type="password"
            placeholder={mode === "editar" ? "Dejar vacío para mantener la actual" : "Ingrese la contraseña"}
            value={form.password}
            onChange={handleChange}
            required={mode === "crear"}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Botón de envío */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow"
        >
          {mode === "crear" ? "Crear Persona" : "Actualizar Persona"}
        </button>
      </div>
    </form>
  );
}
