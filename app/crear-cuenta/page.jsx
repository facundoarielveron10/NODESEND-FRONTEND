'use client';

// ---- IMPORTACIONES ---- //
import { useContext } from 'react';
import AuthContext from '@/context/auth/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
// ----------------------- //

// ---- PAGINA (LOGIN) ---- //
export default function CrearCuenta() {
    // ---- CONTEXTs ---- //
    const { registrarUsuario } = useContext(AuthContext);
    // ------------------ //

    // ---- VALIDACION FORMULARIO ---- //
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre es Obligatorio'),
            email: Yup.string()
                .email('El Email no es Valido')
                .required('El Email es Obligatorio'),
            password: Yup.string()
                .required('La Contraseña es Obligatoria')
                .min(6, 'La Contraseña debe contener al menos 6 caracteres'),
        }),
        onSubmit: (valores) => {
            registrarUsuario(valores);
        },
    });
    // ------------------------------- //

    return (
        <Layout>
            {/* Crear Cuenta */}
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                {/* Titulo */}
                <h2 className="text-4xl font-bold text-gray-800 text-center my-4 uppercase">
                    Crear Cuenta
                </h2>
                {/* Contenedor */}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        {/* Formulario Para Crear Cuenta */}
                        <form
                            className="bg-white rounded shadow-md px-8 pt-5 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            {/* Nombre del Usuario */}
                            <div className="mb-4">
                                {/* Texto Ayuda y Errores */}
                                <div className="flex flex-col cel:flex-row justify-between cel:gap-10">
                                    <label
                                        className="block text-black text-sm font-bold mb-2 uppercase"
                                        htmlFor="nombre"
                                    >
                                        Nombre
                                    </label>
                                    {formik.touched.nombre &&
                                    formik.errors.nombre ? (
                                        <p className="font-bold uppercase text-xs text-red-500">
                                            {formik.errors.nombre}
                                        </p>
                                    ) : null}
                                </div>
                                {/* Entrada del Nombre */}
                                <input
                                    className={`${
                                        formik.touched.nombre &&
                                        formik.errors.nombre
                                            ? 'border-red-500'
                                            : 'border-gray-200'
                                    } border-[1.5px] shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre de Usuario"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Email del Usuario */}
                            <div className="mb-4">
                                {/* Texto Ayuda y Errores */}
                                <div className="flex flex-col cel:flex-row justify-between cel:gap-10">
                                    <label
                                        className="block text-black text-sm font-bold mb-2 uppercase"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    {formik.touched.email &&
                                    formik.errors.email ? (
                                        <p className="font-bold uppercase text-xs text-red-500">
                                            {formik.errors.email}
                                        </p>
                                    ) : null}
                                </div>
                                {/* Entrada del Email */}
                                <input
                                    className={`${
                                        formik.touched.email &&
                                        formik.errors.email
                                            ? 'border-red-500'
                                            : 'border-gray-200'
                                    } border-[1.5px] shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    id="email"
                                    type="email"
                                    placeholder="Email de Usuario"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Password del Usuario */}
                            <div className="mb-4">
                                {/* Texto Ayuda y Errores */}
                                <div className="flex flex-col cel:flex-row justify-between cel:gap-10">
                                    <label
                                        className="block text-black text-sm font-bold mb-2 uppercase"
                                        htmlFor="password"
                                    >
                                        Contraseña
                                    </label>
                                    {formik.touched.password &&
                                    formik.errors.password ? (
                                        <p className="font-bold uppercase text-xs text-red-500">
                                            {formik.errors.password}
                                        </p>
                                    ) : null}
                                </div>
                                {/* Entrada del Password*/}
                                <input
                                    className={`${
                                        formik.touched.password &&
                                        formik.errors.password
                                            ? 'border-red-500'
                                            : 'border-gray-200'
                                    } border-[1.5px] shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña de Usuario"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            {/* Boton de Enviar */}
                            <button
                                className="w-full text-center bg-gradient-to-r bg-rose-500 rounded-lg text-white uppercase font-black py-2 cursor-pointer hover:bg-black transition-colors duration-300"
                                type="submit"
                            >
                                Crear Cuenta
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
// ------------------------ //
