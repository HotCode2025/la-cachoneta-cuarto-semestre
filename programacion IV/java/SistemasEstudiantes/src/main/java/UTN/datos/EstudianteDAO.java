package UTN.datos;

import UTN.dominio.Estudiante;
import com.mysql.cj.xdevapi.PreparableStatement;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class EstudianteDAO {
    // metodo listar
    public List<Estudiante> listar() {
        List<Estudiante> estudiantes = new ArrayList<>();
        // creamos algunos objetos que son necesarios para comunicarnos con la base de datos
        // permite preparar la sentencia para consultar a la base de datos
        PreparableStatement ps;

        // obtiene el resultado de la base de datos
        ResultSet rs;


    }
}
