'use client';
// ---- IMPORTACIONES ---- //
import { useContext, useEffect, useState } from 'react';
import AppContext from '@/context/app/AppContext';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Dropzone from '@/components/Dropzone';
import Alerta from '@/components/Alerta';
// ----------------------- //

// ---- PAGINA (INICIO) ---- //
export default function Home() {
	// ---- CONTEXTs ---- //
	const { usuarioAutenticado, mensaje_archivo, archivo, cargando } =
		useContext(AppContext);
	// ------------------ //

	// ---- ESTADOS ---- //
	const [copiado, setCopiado] = useState(false);
	// ----------------- //

	// ---- EFECTOS ---- //
	useEffect(() => {
		usuarioAutenticado();
	}, []);

	// ----------------- //

	// ---- FUNCIONES ---- //
	const copiarURL = () => {
		navigator.clipboard.writeText(
			`${process.env.frontendURL}/${archivo?.url}`,
		);

		setCopiado(true);

		setTimeout(() => {
			setCopiado(false);
		}, 5000);
	};
	// ------------------- //

	return (
		<Layout>
			{/* Inicio */}
			<div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
				{archivo?.url ? (
					<>
						{/* Boton de Copiar */}
						<div className="flex justify-end items-center gap-2 my-3">
							{copiado ? (
								<p className="text-sm text-green-500 uppercase font-black">
									La URL ha sido copiada
								</p>
							) : null}
							<button
								className="bg-rose-500 text-white py-1 px-2 uppercase rounded-lg font-black text-xs hover:bg-rose-600 transition-colors duration-300"
								type="button"
								onClick={() => copiarURL()}
							>
								Copiar enlace
							</button>
						</div>
						{/* URL del archivo */}
						<div className="bg-white rounded shadow-lg px-8 pt-5 pb-8 mb-4">
							<p className="text-center text-2xl">
								<span className="font-black text-rose-500 uppercase select-none">
									Tu URL es:{' '}
								</span>
								{process.env.frontendURL}/enlaces/{archivo?.url}
							</p>
						</div>
					</>
				) : (
					<>
						{/* Alerta */}
						{mensaje_archivo && <Alerta />}
						{/* Contenedor del inicio */}
						<div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
							{/* Subir Archivos (DROPZONE) */}
							<Dropzone />
							{/* Contenido */}
							<div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
								{/* Titulo */}
								<h2 className="text-4xl font-bold text-gray-800 my-4">
									Compartir archivos de forma sencilla y
									privada
								</h2>
								{/* Parrafo de ayuda */}
								<p className="text-lg leading-loose">
									<span className="text-rose-500 font-bold">
										NodeSend
									</span>{' '}
									te permite compartir archivos con cifrado de
									extremo a extremo y un archivo que es
									eliminado despues de ser descargado. Asi que
									puedes mantener lo que compartes en privado
									y asegurate de que tus cosas no permanezcan
									en linea para siempre
								</p>
								{/* Crear cuenta */}
								<Link
									href="/crear-cuenta"
									className="text-rose-500 font-bold text-lg hover:text-rose-600 transition-colors duration-300"
								>
									Crea una cuenta para mayores beneficios
								</Link>
							</div>
						</div>
					</>
				)}
			</div>
		</Layout>
	);
}
// ------------------------- //
