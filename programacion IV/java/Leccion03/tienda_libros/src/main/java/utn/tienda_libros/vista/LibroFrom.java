package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.LibroServicio;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;

@Component
public class LibroFrom extends JFrame {
    LibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;
    private JButton agregarButton;
    private JButton modificarButton;
    private JButton eliminarButton;
    private JButton a;
    private DefaultTableModel tablaModeloLibros;
    private Integer idLibroSeleccionado;

    @Autowired
    public LibroFrom(LibroServicio libroServicio){
        this.libroServicio = libroServicio;
        iniciarForma();

        agregarButton.addActionListener(e -> agregarLibro());
        modificarButton.addActionListener(e -> modificarLibro());
        eliminarButton.addActionListener(e -> eliminarLibro());

    }
    private void iniciarForma(){
        setContentPane(panel);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
        setSize(900,700);
        //Para obtener las dimensiones de las ventanas
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension tamanioPantalla = toolkit.getScreenSize();
        int x = (tamanioPantalla.width - getWidth()/2);
        int y = (tamanioPantalla.height - getHeight()/2);
        setLocation(x, y);
    }

    private void agregarLibro(){
        //Leer los valores del formulario
        if(libroTexto.getText().equals("")){
            mostrarMensaje("Ingresa el nombre del libro");
            libroTexto.requestFocusInWindow();
            return;
        }
        var nombreLibro = libroTexto.getText();
        var autor = autorTexto.getText();
        var precio = Double.parseDouble(precioTexto.getText());
        var existencias = Integer.parseInt(existenciasTexto.getText());
        //Creamos el objeto libro
        var libro = new Libro(null, nombreLibro,autor,precio,existencias);
        //libro.setNombreLibro(nombreLibro);
        //libro.setAutor(autor);
        //libro.setPrecio(precio);
        //libro.setExistencias(existencias);
        this.libroServicio.guardarLibro(libro);
        mostrarMensaje("Se agrego el libro...");
        limpiarFormulario();
        listarLibros();
    }
    private void seleccionarLibro() {

        int filaSeleccionada = tablaLibros.getSelectedRow();

        if (filaSeleccionada == -1) {
            return;
        }

        idLibroSeleccionado =
                (Integer) tablaModeloLibros.getValueAt(filaSeleccionada, 0);

        libroTexto.setText(
                tablaModeloLibros.getValueAt(filaSeleccionada, 1).toString()
        );

        autorTexto.setText(
                tablaModeloLibros.getValueAt(filaSeleccionada, 2).toString()
        );

        precioTexto.setText(
                tablaModeloLibros.getValueAt(filaSeleccionada, 3).toString()
        );

        existenciasTexto.setText(
                tablaModeloLibros.getValueAt(filaSeleccionada, 4).toString()
        );
    }

    private void modificarLibro() {

        if (idLibroSeleccionado == null) {
            mostrarMensaje("Selecciona un libro de la tabla");
            return;
        }

        var nombreLibro = libroTexto.getText();
        var autor = autorTexto.getText();
        var precio = Double.parseDouble(precioTexto.getText());
        var existencias = Integer.parseInt(existenciasTexto.getText());

        var libro = new Libro(
                idLibroSeleccionado,
                nombreLibro,
                autor,
                precio,
                existencias
        );

        libroServicio.guardarLibro(libro);

        mostrarMensaje("Se modificó el libro...");

        limpiarFormulario();
        idLibroSeleccionado = null;
        listarLibros();
    }

    private void eliminarLibro() {

        if (idLibroSeleccionado == null) {
            mostrarMensaje("Selecciona un libro de la tabla");
            return;
        }

        int respuesta = JOptionPane.showConfirmDialog(
                this,
                "¿Estás seguro de eliminar este libro?",
                "Confirmar eliminación",
                JOptionPane.YES_NO_OPTION
        );

        if (respuesta == JOptionPane.YES_OPTION) {

            var libro = libroServicio.buscarLibroPorId(idLibroSeleccionado);

            if (libro != null) {

                libroServicio.eliminarLibro(libro);

                mostrarMensaje("Se eliminó el libro...");

                limpiarFormulario();
                idLibroSeleccionado = null;
                listarLibros();
            }
        }
    }


    private void limpiarFormulario(){
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
    }

    private void mostrarMensaje(String mensaje){
        JOptionPane.showMessageDialog(this, mensaje);
    }

    private void createUIComponents() {
        this.tablaModeloLibros = new DefaultTableModel(0, 5);

        String[] cabecera = {
                "Id",
                "Libro",
                "Autor",
                "Precio",
                "Existencias"
        };

        this.tablaModeloLibros.setColumnIdentifiers(cabecera);

        this.tablaLibros = new JTable(tablaModeloLibros);

        tablaLibros.getSelectionModel()
                .addListSelectionListener(e -> seleccionarLibro());

        listarLibros();
    }

    private void listarLibros(){
        //Limpiar la tabla
        tablaModeloLibros.setRowCount(0);
        //Obtener los libros de la BD
        var libros = libroServicio.listarLibros();
        //Iteramos cada libro
        libros.forEach((libro) ->{
            //Creamos registro para agregarlos a la tabla
            Object[] renglonLibro = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias(),
            };
            this.tablaModeloLibros.addRow(renglonLibro);
        });
    }
}
