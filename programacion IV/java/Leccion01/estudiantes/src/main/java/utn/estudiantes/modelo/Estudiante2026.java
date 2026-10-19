package utn.estudiantes.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

// Representa una tabla de datos, es una clase de entidad
@Entity
// boilerplate - Repetitivo
//Genera los get y set
@Data
// Constructor vacio
@NoArgsConstructor
// Constructor con todos los argumentos
@AllArgsConstructor
@ToString
@Table(name = "estudiantes2026")
public class Estudiante2026  { //Lleva este nombre porque es el nombre que apunta a la tabla

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idestudiantes2026;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
}
