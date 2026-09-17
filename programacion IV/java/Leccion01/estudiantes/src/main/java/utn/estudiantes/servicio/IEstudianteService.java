package utn.estudiantes.servicio;

import utn.estudiantes.modelo.Estudiante2026;

import java.util.List;

public interface IEstudianteService {
    public List<Estudiante2026> listarEstudiantes();
    public Estudiante2026 buscarEstudiantePorId(Integer idEstudiante);
    public void guardarEstudiante(Estudiante2026 estudiante);
    public void eliminarEstudiante(Estudiante2026 estudiante);
}
