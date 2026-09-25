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
