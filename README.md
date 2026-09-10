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
