package utn.estudiantes.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.estudiantes.modelo.Estudiante2026;
import utn.estudiantes.repositorio.EstudianteRepositorio;

import java.util.List;

@Service
public class EstudianteServicio implements IEstudianteService{

    @Autowired
    private EstudianteRepositorio estudianteRepositorio;


    @Override
    public List<Estudiante2026> listarEstudiantes() {
        List<Estudiante2026> estudiantes = estudianteRepositorio.findAll();
        return estudiantes;
    }

    @Override
    public Estudiante2026 buscarEstudiantePorId(Integer idEstudiante) {
        Estudiante2026 estudiante = estudianteRepositorio.findById(idEstudiante).orElse(null);
        return estudiante;
    }

    @Override
    public void guardarEstudiante(Estudiante2026 estudiante) {
        estudianteRepositorio.save(estudiante);
    }

    @Override
    public void eliminarEstudiante(Estudiante2026 estudiante) {
        estudianteRepositorio.delete(estudiante);
    }
}
