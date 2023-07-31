// ---- IMPORTACIONES ---- //
import clienteAxios from '@/config/axios';
import Layout from '@/components/Layout';
// ----------------------- //

// ---- PROPS ESTATICOS ---- //
export async function getStaticProps() {
	const { data } = await clienteAxios.get('/api/enlaces/PDWyNoL5l');

	return {
		props: {
			enlace: data,
		},
	};
}
// ------------------------- //

// ---- PATHS ESTATICOS ---- //
export async function getStaticPaths() {
	const enlaces = await clienteAxios.get('/api/enlaces');

	return {
		paths: enlaces.data.enlaces.map(enlace => ({
			params: { enlace: enlace.url },
		})),
		fallback: false,
	};
}
// ------------------------- //

// ---- COMPONENTE (ENLACE DE DESCARGA) ---- //
export default function Enlace({ enlace }) {
	console.log(enlace);
	return (
		<Layout>
			<h2>Enlace</h2>
		</Layout>
	);
}
// ----------------------------------------- //
