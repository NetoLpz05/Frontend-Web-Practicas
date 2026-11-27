# Frontend-Web-Practicas

Practica 1:
¿Hubo algún error, alguna advertencia o algo en la consola que avisara?
No me mostró ningún error, lo que imprimió la consola fue 35050

Práctica 2:
¿Por qué una unión de valores y no una enumeración?
No genera código extra en JS, se evita complejidad con un enum y se valida fácil

¿Qué se gana con el tipo desconocido en lugar del que acepta todo?
Obliga a validad antes de entrar en operación

¿Por qué la fecha entra como parámetro?
Porque el estado y la multa del prestamo dependen del tiempo en que se consulta

Práctica 3:
¿Hizo falta una base de datos real para probar la regla de negocio? ¿Qué dice eso sobre para qué sirve el patrón Repository?
No, porque se utiliza un repositorio en memoria y solo con eso basta para verificar las reglas que tenemos establecidad

El Service recibe el repositorio como Repository<Prestamo>, no InMemoryPrestamoRepository. ¿Qué se rompía si usaban la clase concreta?
El Service quedaba acoplado a una implementación específica y no se podría ejecutar de forma adecuada

Si cambiaran el Map en memoria por una base de datos real, ¿cuántos archivos tocarían? ¿Por qué tan pocos?
Se cambiarían dos archivos, el de infraestructura donde implementaríamos el repo conectado a la BDD y el main para preparar la instancia a la BDD

Práctica 4:
Express manda los rechazos de un handler async directo al middleware de errores, sin try/catch en cada ruta. ¿Qué tendrían que agregar en cada ruta si esto no fuera así?
un try catch con un next(error)

¿Por qué el servicio no lanza directamente un 409 en vez de EjemplarPrestadoError?
El servicio del prestamo no lanza porque pertenece a negocio

Si mañana agregaran una app móvil que también consume esta API, ¿qué archivos de esta práctica tendrían que tocar?
no se tendría que cambiar nada, si se toman las mismas rutas, si cambiara el contrato se tendría que cambiar el prestamo.dto, validar y el servidor

Práctica 5:
Que pasa al hacer npm run start:dev por primera vez?
Aparece un html vacío solo con un Hello World en el

Que hace el app.service que ya viene generado?
Se manda una petición GET que regresa el string de Hello World!

¿Por qué la ruta funciona sin declarar nada en app.module.ts?
Porque primero registra AppController y luego detecta automaticamente lo que tiene dentro, por eso funciona

Que pasaría si el cuerpo de la petición viniera vacío?
La respuesta sería vacía y se enviaría un error 400

En que archivo vive hoy toda la lógica de la practica?
Vive en app.controller.ts

Práctica 6:
¿Qué pasa si el módulo no queda registrado en la raíz?
Nest no lo incorpora al árbol de módulos de la aplicación, sus controladores y proveedores no se inicializan, así que sus rutas no quedan disponibles y el servicio no puede inyectarse

¿Por qué los métodos del repositorio devuelven promesas si los datos están en memoria?
Para mantener un contrato que también funcione con una base de datos, donde las operaciones son asíncronas

¿Qué error aparece al cambiar a la interfaz, y por qué la clase sí se resolvía sola?
Nest no puede resolver la dependencia del repositorio porque una interfaz de TypeScript desaparece al compilarse a JavaScript, con emitDecoratorMetadata, suele aparecer como Object y el error indica que no puede resolver esa dependencia del servicio

¿Por qué el servicio necesita un token para el repositorio, pero el controlador no para el servicio?
El tipo del repositorio es una interfaz, que no sirve como token en tiempo de ejecución; por eso se usa INSCRIPCION_REPOSITORY

¿Cuál es la diferencia entre 400 y 409?
400 indica que la petición está mal formada o le faltan campos obligatorios. 409 indica que la petición es válida, pero choca con una regla o con el estado actual

¿Por qué cambió el estado de la última petición?
La petición de inscripción había dado 409 porque no quedaba cupo, al cancelar otra inscripción, su estado pasa a cancelada y deja de contar entre las confirmadas, al reenviar la petición, ya hay lugar y responde 201

Practica 7:
¿Por qué la interfaz no menciona Express, NestJS ni memoria?
Porque solo define el contrato del repositorio: qué operaciones ofrece y qué datos reciben o devuelven.

¿Qué palabra de la clase promete cumplir esa interfaz?
implements, en MiembroMemoriaRepository implements MiembroRepository

¿Por qué el repositorio no sabe qué es una petición HTTP?
Porque su responsabilidad es consultar y modificar miembros, no gestionar rutas, códigos de estado ni solicitudes

¿Por qué el controlador inyecta el Service sin token y el repositorio sí necesita uno?
MiembrosService es una clase concreta disponible en tiempo de ejecución, así que Nest puede usarla directamente como token. MiembroRepository es una interfaz de TypeScript y desaparece al compilar; por eso se usa MIEMBRO_REPOSITORY como token explícito

¿Qué prueba que Miembros no rompió Inscripciones?
En ejecución, Inscripciones siguió devolviendo 201 para las primeras altas, 409 para cupo lleno y duplicidad, 200 al cancelar y 201 al reintentar tras la cancelación

Práctica 8:
¿Por qué el adaptador se llama adapter-mariadb si usamos MySQL?
Porque el adaptador usa el controlador Node.js de MariaDB, que es compatible con la conexión de MySQL

¿Editar schema.prisma cambió la base antes de migrar?
No, al editar el archivo solo cambia la definición del esquema en el proyecto, la base cambia cuando aplicas esos cambios

¿La carpeta de migraciones es una foto del esquema o un historial?
Es un historial, guarda los cambios incrementales en el orden en que se generaron

¿Por qué Horario.clase sí crea columna y Clase.horarios no?
Horario.clase está asociada al campo escalar claseId, que guarda el identificador de la clase y es la clave foránea, Clase.horarios representa el lado inverso de la relación

¿De dónde sale la relación muchos a muchos entre Miembro y Horario?
No hay una relación M:M Inscripcion funciona como entidad intermedia: cada inscripción conecta un miembro con un horario

Práctica 10:
¿Por qué el filtro atrapa la clase base y no cada error por separado?
Porque los cuatro errores de dominio heredan de ErrorDeDominio. Al usar @Catch(ErrorDeDominio), el filtro captura cualquiera de esas clases hijas y centraliza su traducción a HTTP

¿Por qué este middleware no podría decidir si un usuario tiene permiso para una ruta?
Porque se ejecuta antes de que Nest resuelva el controlador y el método que atenderán la petición, en ese momento no tiene el contexto de ruta ni el usuario validado en req.user, para la autenticación y autorización se usa un Guard, este puede consultar los metadatos de la ruta y ejecutarse después de validar el token

¿Por qué la petición que responde 409 no aparece en ese registro?
Porque el LoggingInterceptor usa tap() para registrar cuando el controlador responde correctamente

¿Por qué este cambio rompe a cualquier cliente que ya estuviera usando la API?
Porque el SobreInterceptor cambia la forma de las respuestas exitosas: en vez de recibir directamente, por ejemplo, una lista, el cliente recibe { data, meta }

Si el servidor respondió en los dos casos, ¿quién bloquea y a quién protege?
El servidor responde a ambos requests, para un origen no permitido, omite Access-Control-Allow-Origin; entonces el navegador bloquea que el código JavaScript de esa página lea la respuesta, CORS protege al usuario del navegador frente a páginas de otros orígenes que intenten leer respuestas

¿Por qué el campo se llama passwordHash y no password?
Porque la base de datos debe guardar el hash derivado de la contraseña, no la contraseña original

¿Por qué los dos errores del inicio de sesión dicen exactamente lo mismo?
Para que alguien no pueda averiguar si una cuenta existe probando correos

Si el contenido se puede leer, ¿qué es lo que protege la firma?
Protege su integridad y autenticidad: permite verificar que el token fue firmado con el secreto del servidor y que su contenido no fue modificado

¿Por qué es más seguro proteger todo y abrir a mano, que al revés?
Porque si alguien olvida configurar una ruta, con el esquema seguro por defecto queda protegida y responde 401 hasta que se marque expresamente como pública

¿Cuál es la diferencia entre un 401 y un 403?
401 Unauthorized: falta una credencial válida; por ejemplo, no se envió token o el token no es válido
403 Forbidden: la identidad sí fue autenticada, pero no tiene permiso para hacer esa acción

¿Cuántas líneas de AuthService tuvieron que cambiar para pasar de memoria a MySQL? ¿Por qué?
Cero. AuthService depende del contrato UsuarioRepository, no directamente del almacenamiento

Practica 11:
El nombre de una etiqueta personalizada debe llevar un guion para que el navegador pueda distinguirla de las etiquetas HTML estándar

Practica 12:
¿En qué se convirtió cada etiqueta del JSX?
En llamadas de JavaScript que crean elementos de React. Por ejemplo, h1 se convierte en una llamada que crea un elemento h1

Si React es una biblioteca, ¿quién traduce el JSX?
El compilador de la herramienta de desarrollo, Vite transforma el JSX antes de que el navegador lo ejecute.

¿Qué hacen createRoot y render?
createRoot prepara el contenedor de la página para React, render muestra los componentes dentro de ese contenedor

¿Qué pasa si se omite la prop obligatoria nombre?
TypeScript muestra un error porque falta una propiedad requerida

¿Por qué el nombre de un componente empieza con mayúscula?
Para que JSX lo distinga de una etiqueta HTML: Saludo se reconoce como un componente; saludo, como una etiqueta HTML

Práctica 13:
¿Por qué el Layout no necesita saber que es una tienda?
Porque es un componente genérico: recibe el encabezado, el pie y el contenido como elementos y solo define dónde colocarlos

¿Qué pasa si escribes onClick={onAgregar(producto)} sin la flecha?
La función se ejecuta inmediatamente durante el render, en vez de esperar al click

¿Por qué con carrito.push(...) el contador no se mueve y no sale ningún error?
Push modifica el arreglo existente, pero no se le avisa a React que debe volver a renderizar

Practica 15:
¿Por qué el 404 sí tiene encabezado y pie?
Porque la ruta * está anidada dentro de la ruta que muestra Layout. El layout renderiza el encabezado y el pie, y su <Outlet /> muestra en medio la página 404.

¿Qué cambia en la pestaña Red con a href en lugar de Link?

Con Link, Router cambia de ruta sin volver a solicitar el documento HTML
Con a href, el navegador hace una navegación completa y aparece una solicitud Documento a /clases/1; luego la página vuelve a cargar sus datos desde la API

¿En qué tipo de dato llega el ID de la URL?
useParams lo entrega como texto (string, o undefined si no existe)

¿Qué pasa de /clases/1 a /clases/2 si el ID no está en las dependencias del efecto?
El componente de detalle puede reutilizarse al cambiar de clase. Si el efecto no depende del ID, no vuelve a pedir los datos y puede quedarse mostrando la clase anterior

Practica 16:
¿Por qué usar un contexto en vez de props para la sesión? 
El contexto permite que componentes distantes lean y actualicen la sesión sin pasar usuario, token y funciones por cada componente intermedio

¿Qué pasa si se usa la sesión fuera del proveedor? 
useSesion() lanza un error explicativo: debe usarse dentro de <ProveedorSesion>

Practica 17:
¿La ruta protegida hace segura la aplicación? ¿Qué protege realmente los datos?
No por sí sola, la ruta protegida en el frontend evita que una persona sin sesión vea esa página, pero puede modificarse o saltarse

¿Por qué no se manda miembroId al inscribirse?
Porque el backend debe identificar al miembro a partir del token de sesión, no confiar en un ID enviado por el navegador

¿Qué diferencia hay entre un 401 y un 403?
401 (No autorizado): falta una sesión válida, por ejemplo, porque no se envió un token o expiró
403 (Prohibido): la sesión es válida, pero esa cuenta no tiene permiso para realizar la acción

¿Dónde se guarda el token y qué riesgo tiene? 
En localStorage, bajo la clave token, persiste al recargar la página, pero cualquier JavaScript que se ejecute en el mismo origen

Practica 18:
¿Cuánto se ahorró y por qué es poco?
En la ruta /clases, la descarga inicial de JavaScript pasó de 326,967 a 324,495 bytes: un ahorro de 2,472 bytes 

¿Por qué falla la API si el preview corre en el puerto 4173?
Porque vite preview sirve el frontend; no inicia el backend

¿Cuándo conviene Context y cuándo un store?
Context conviene para datos compartidos por muchos componentes que cambian poco, como la sesión y el usuario, un store conviene para estado compartido que cambia más seguido o tiene acciones propias

Práctica 19:
¿Qué archivo de Angular hace el papel de main.tsx, de App.tsx y de vite.config.ts?
main.tsx -> src/main.ts: inicia la aplicación y monta el componente raíz
App.tsx -> src/app/app.ts, junto con su plantilla app.html y estilos app.css. Angular separa la lógica de la vista
vite.config.ts -> principalmente angular.json: configura compilación, ejecución, estilos y recursos. No es una equivalencia exacta; Angular CLI gestiona esa configuración

¿Por qué clase() lleva pas y para qué sirve track?
En tarjeta-clase.ts, clase se declara con input.required<Clase>()
En @for (clase of clases; track clase.id), track clase.id identifica cada clase por su ID

Provocar y capturar los errores NG5002 y NG8001
NG5002: NG5002: Unclosed block "if" — ocurre al dejar sin cerrar un bloque de control
NG8001: 'app-elemento-inexistente' is not a known element — ocurre al usar un elemento Angular que no está registrado/importado como componente

Práctica 20:
¿Qué diferencia hay entre un signal y un computed, y cuál se parece a useState y cuál a useMemo?
signal() guarda un valor que puede cambiar y notifica a quienes lo leen, se parece a useState, computed() calcula un valor derivado de uno o más signals y lo actualiza cuando cambian sus dependencias; se parece a useMemo

¿Qué pasa si el filtro hace new Catalogo() en lugar de inject(Catalogo)?
Si el filtro hace new Catalogo() en vez de inject(Catalogo), crea otra instancia del servicio

Práctica 21:
Responder: ¿qué pieza de React Router corresponde a router-outlet, a routerLink y a routerLinkActive?
router-outlet corresponde a Outlet, que muestra la página de la ruta activa. routerLink corresponde a Link to="...", que permite navegar, routerLinkSctive aplica una clase cuando la ruta está activa

Responder: ¿por qué la ruta comodín (**) va al final y la ruta vacía necesita pathMatch: 'full'?
La ruta ** coincide con cualquier URL que no haya coincidido antes, por eso va al final y null hace que la ruta vacía solo coincida cuando la URL está vacía

Responder: ¿dónde vive el valor de un campo en un formulario reactivo y en qué se diferencia del useState de React?
El valor vive en un FormControl, dentro de un FormGroup

Responder: ¿qué regresa un validador propio cuando el valor es válido y cuando no, y cómo se relaciona con hasError?
Cuando el valor es válido, devuelve null. Si no lo es, devuelve un objeto con la clave del error

Responder: ¿qué cambió en el servicio del catálogo y por qué ningún componente se enteró?
El servicio pasó de usar datos locales a obtenerlos de la API con httpResource (GET /clases)

Responder: ¿por qué no hizo falta iniciar sesión para leer el catálogo?
Porque el endpoint GET /clases está marcado como público con @Publico(), y el guard de autenticación permite el acceso a esos endpoints sin token

Practica 22:
Si el formulario ya valida, ¿por qué también valida el servidor? 
La validación del formulario ayuda a la persona a corregir errores antes de enviar los datos, pero no es una frontera de seguridad, una petición puede enviarse sin usar la interfaz o modificarse desde el navegador

¿Por qué httpResource para leer y HttpClient para crear, editar y eliminar? 
httpResource encaja con las lecturas: mantiene el estado de carga, error y respuesta de forma reactiva, y permite recargar el catálogo

¿Qué pasa si se olvida el subscribe()? 
Los observables de HttpClient son fríos, la petición no se ejecuta hasta que alguien se suscribe, si no hay subscribe() ni otro consumidor, como firstValueFrom, la petición no se envía

¿A qué pieza de React corresponden las rutas hijas (children), el interceptor y el guardia?
Las rutas hijas corresponden a rutas anidadas de React Router, que se muestran en un Outlet, el interceptor se parece a los interceptores de Axios o a una capa común alrededor de fetch: puede modificar peticiones y reaccionar a respuestas, el guardia cumple una función similar a proteger una ruta en React Router y redirigir si no hay sesión válida

¿Cuándo se ejecuta el guardia y por qué salir() tiene que navegar al login? 
El guardia se ejecuta durante la navegación, antes de activar la ruta protegida; el guardia de rutas hijas se vuelve a evaluar al navegar entre ellas. salir() borra la sesión, pero eso por sí solo no cambia la ruta que ya está abierta

¿Cómo decide un mismo formulario, con dos rutas, si manda POST o PATCH?
La ruta de edición proporciona el id como input del componente; la ruta de creación no lo proporciona, al guardar, si hay id se llama a actualizar con PATCH; si no, se crea con POST

¿Por qué el estado del formulario no se puede observar con un computed()?
computed() reacciona a signals, pero el estado de FormGroup —por ejemplo dirty, valid o los valores— no es una signal, se puede consultar directamente o convertir sus observables, como valueChanges o statusChanges

¿Qué diferencia hay entre canActivate y canDeactivate, y qué casos no cubre la guarda de salida? 
canActivate decide si se puede entrar a una ruta; canDeactivate decide si se puede salir del componente activo, por ejemplo, para confirmar que no se descarten cambios sin guardar

Opcional: ¿por qué la ruta de crear va antes que la del id?
No se implementó una página de detalle /clases/:id en esta entrega. Si se agrega una ruta genérica como /clases/:id, la ruta literal /clases/nueva debe declararse antes: Angular evalúa las rutas en orden y nueva podría interpretarse como el valor del parámetro id
