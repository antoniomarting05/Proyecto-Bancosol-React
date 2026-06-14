export const useAsignacionTurno = () => {

	const [asignaciones, setAsignaciones] = useState([]);
	const [tipoCampanyas, setTipoCampanyas] = useState([]);
	const [campanyas, setCampanyas] = useState([]);

	// Estado de carga
	const [cargando, setCargando] = useState(true);

	// Filtros activos
	const [tipoCampanyaId, setTipoCampanyaId] = useState(0);
	const [campanyaId, setCampanyaId] = useState(0);

	// Estado del panel lateral
	const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
	const [linealesTotales, setLinealesTotales] = useState(1);

	// Parámetros del turno a visualizar
	const [turnoActual, setTurnoActual] = useState(1);
	const [linealActual, setLinealActual] = useState(1);
	const [turnoData, setTurnoData] = useState(null);

	// Cargar datos iniciales
	useEffect(() => {
		const cargarDatos = async () => {
			setCargando(true);

			// Cargar turnos iniciales
			const data = await getAsignacionesTurnos();
			setAsignaciones(data);

			// Cargar tipos de campañas
			const tipos = await getTipoCampanyas();
			setTipoCampanyas(tipos);

			// Cargar todas las campañas al principio (el backend permite pasar 0 para traerlas todas)
			const camps = await getCampanyasPorTipo(0);
			setCampanyas(camps);

			setCargando(false);
		};
		cargarDatos();
	}, []);

	// Manejar cambio en filtro "Tipo de Campaña"
	const handleTipoChange = async (e) => {
		setCargando(true);
		const nuevoTipoId = Number(e.target.value);
		setTipoCampanyaId(nuevoTipoId);

		// Al cambiar de tipo, reseteamos la campaña seleccionada a "Sin filtro"
		setCampanyaId(0);

		// Actualizamos el desplegable de campañas con las de ese tipo (o todas si es 0)
		const camps = await getCampanyasPorTipo(nuevoTipoId);
		setCampanyas(camps);

		// Filtramos la tabla de turnos pasando el nuevo tipo y campaña 0
		const dataFiltrada = await filtrarAsignaciones(nuevoTipoId, 0);
		setAsignaciones(dataFiltrada);

		setCargando(false);
	};

	// Manejar cambio en filtro "Campaña"
	const handleCampanyaChange = async (e) => {
		setCargando(true);
		const nuevaCampId = Number(e.target.value);
		setCampanyaId(nuevaCampId);

		// Filtramos la tabla de turnos manteniendo el tipo de campaña actual
		const dataFiltrada = await filtrarAsignaciones(tipoCampanyaId, nuevaCampId);
		setAsignaciones(dataFiltrada);

		setCargando(false);
	};

	// Click en una fila de la tabla
	const handleClickFila = async (
		idTiendaCampanya,
		numLineales,
		nombreTienda,
		domicilioTienda,
	) => {
		// Si pincha en la misma fila seleccionada, la cerramos
		if (tiendaSeleccionada?.id === idTiendaCampanya) {
			cerrarPanel();
			return;
		}

		// Abrimos el panel
		setTiendaSeleccionada({
			id: idTiendaCampanya,
			nombre: nombreTienda,
			domicilio: domicilioTienda,
		});
		setLinealesTotales(Number(numLineales) || 1);
		setTurnoActual(1);
		setLinealActual(1);

		// Fetch información del turno 1, lineal 1
		cargarTurnoEspecifico(idTiendaCampanya, 1, 1);
	};

	const cargarTurnoEspecifico = async (idTienda, turno, lineal) => {
		const data = await buscarTurno(idTienda, turno, lineal);
		setTurnoData(data);
	};

	const handleTurnoChange = (e) => {
		const nuevoTurno = Number(e.target.value);
		setTurnoActual(nuevoTurno);
		cargarTurnoEspecifico(tiendaSeleccionada.id, nuevoTurno, linealActual);
	};

	const handleLinealChange = (e) => {
		const nuevoLineal = Number(e.target.value);
		setLinealActual(nuevoLineal);
		cargarTurnoEspecifico(tiendaSeleccionada.id, turnoActual, nuevoLineal);
	};

	const cerrarPanel = () => {
		setTiendaSeleccionada(null);
		setTurnoData(null);
	};

	const handleCrearEditarTurno = () => {
		if (tiendaSeleccionada) {
			navigate(
				`/turnos/crearTurno?id=${tiendaSeleccionada.id}&turno=${turnoActual}&lineal=${linealActual}`,
			);
		}
	};

	// Formatear saltos de linea de los turnos en la tabla
	const formatearTurno = (texto) => {
		if (!texto) return "";
		const partes = texto.split(/(?=\bL\d+)/g);
		return partes.map((parte, i) => <div key={i}>{parte}</div>);
	};

	return {};
};
