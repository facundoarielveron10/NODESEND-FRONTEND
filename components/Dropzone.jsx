'use client';
// ---- IMPORTACIONES ---- //
import { useCallback, useContext } from 'react';
import AppContext from '@/context/app/AppContext';
import { useDropzone } from 'react-dropzone';
// ----------------------- //

// ---- COMPONENTE (DROPZONE) ---- //
export default function Dropzone() {
	// ---- CONTEXTs ---- //
	const { cargando, mostrarAlerta, subirArchivo, crearEnlace } =
		useContext(AppContext);
	// ------------------ //

	// ---- DROPZONE ---- //
	const onDropRejected = () => {
		mostrarAlerta(
			'No se pudo subir, el limite es 1MB, obten una cuenta gratis para subir archivos mas grandes',
		);
	};

	const onDropAccepted = useCallback(async acceptedFiles => {
		// Creando el form data para los archivos
		const formData = new FormData();
		formData.append('archivo', acceptedFiles[0]);

		subirArchivo(formData, acceptedFiles[0].path);
	}, []);

	const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
		useDropzone({
			onDropAccepted,
			onDropRejected,
			maxSize: 1000000,
		});

	const archivos = acceptedFiles.map(archivo => (
		<li
			className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
			key={archivo.lastModified}
		>
			<p className="font-black text-xl">{archivo.path}</p>
			<p className="text-sm text-gray-500">
				{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB
			</p>
		</li>
	));
	// ------------------ //
	return (
		<div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
			{acceptedFiles.length > 0 ? (
				<div className="mt-10 w-full">
					{/* Titulo */}
					<h4 className="text-2xl font-bold text-center mb-4">
						Archivos
					</h4>
					{/* Listado de archivos subidos */}
					<ul className="text-center">{archivos}</ul>
					{/* Boton de creacion de enlace */}
					{cargando ? (
						<div className="flex justify-center my-2">
							<span className="loader"></span>
						</div>
					) : (
						<button
							className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800 transition-colors duration-300"
							type="button"
							onClick={() => crearEnlace()}
						>
							Crear Enlace
						</button>
					)}
				</div>
			) : (
				<>
					{/* Cuadro de subida */}
					<div
						{...getRootProps({
							className: 'dropzone w-full py-32',
						})}
					>
						{/* Subida de archivo */}
						<input className="h-100" {...getInputProps()} />
						{/* Remarco aceptado para el arrastramiento de un archivo */}
						{isDragActive ? (
							// Mensaje al arrastrar un archivo
							<p className="text-2xl text-center text-gray-600">
								Suelta el archivo
							</p>
						) : (
							// Contenido del recuadro aceptado para el arrastramiento de un archivo
							<div className="text-center">
								<p className="text-2xl text-center text-gray-600">
									Selecciona un archivo y arrastralo aqui
								</p>
								<button
									type="button"
									className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800 transition-colors duration-300"
								>
									Selecciona archivos para subir
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
// ------------------------------- //
