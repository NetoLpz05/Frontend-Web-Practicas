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
En llamadas de JavaScript que crean elementos de React. Por ejemplo, <h1> se convierte en una llamada que crea un elemento h1

Si React es una biblioteca, ¿quién traduce el JSX?
El compilador de la herramienta de desarrollo, Vite transforma el JSX antes de que el navegador lo ejecute.

¿Qué hacen createRoot y render?
createRoot prepara el contenedor de la página para React, render muestra los componentes dentro de ese contenedor

¿Qué pasa si se omite la prop obligatoria nombre?
TypeScript muestra un error porque falta una propiedad requerida

¿Por qué el nombre de un componente empieza con mayúscula?
Para que JSX lo distinga de una etiqueta HTML: <Saludo /> se reconoce como un componente; <saludo />, como una etiqueta HTML


