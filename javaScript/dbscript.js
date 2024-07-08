document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('usuarioForm');
    const tableBody = document.getElementById('usuariosTable').querySelector('tbody');
    let isUpdating = false;

    //async permite que la función se comporte de manera asíncrona, 
    //puede ejecutar operaciones sin bloquear el hilo principal de ejecucion
    const fetchUsuarios = async () => {
        //luego cambiaremos la url por https://<hostdepanywhere>/productos
        const response = await fetch('https://127.0.0.1:5000/usuarios');// promesa: esperar a que se complete la solicitud HTTP
        const usuarios = await response.json(); //esperar a que se complete la conversión de la respuesta a JSON
        tableBody.innerHTML = '';
        usuarios.forEach(usuarios => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuarios.id}</td>
                <td>${usuarios.nombre}</td>
                <td>${usuarios.apellido}</td>
                <td>${usuarios.email}</td>
                <td>${usuarios.pw}</td>
                <td>
                    <button onclick="editProducto(${usuarios.id}, '${usuarios.nombre}', ${usuarios.apellido}, ${usuarios.email}, ${usuarios.pw})">Editar</button>
                    <button onclick="deleteProducto(${usuarios.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const addUsuario = async (usuario) => {
        await fetch('https://milepeletay123.pythonanywhere.com/nuevo_producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        fetchUsuarios();
    };

    const updateUsuario = async (id, usuario) => {
        await fetch(`https://milepeletay123.pythonanywhere.com/actualizar_producto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        fetchUsuarios();
    };

    const deleteUsuario = async (id) => {
        await fetch(`https://milepeletay123.pythonanywhere.com/eliminar_producto/${id}`, {
            method: 'DELETE'
        });
        fetchUsuarios();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('usuarioId').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const pw = document.getElementById('Password').value;
        const usuario = { nombre, apellido, email, pw };

        if (isUpdating) {
            updateUsuario(id, usuario);
            isUpdating = false;
        } else {
            addUsuario(usuario);
        }

        form.reset();
        document.getElementById('usuarioId').value = '';
    });

    window.editUsuario = (id, nombre, cantidad, precio) => {
        document.getElementById('usuarioId').value = id;
        document.getElementById('nombre').value = nombre;
        document.getElementById('apellido').value = apellido;
        document.getElementById('email').value = email;
        document.getElementById('password').value = pw;
        isUpdating = true;
    };

    window.deleteUsuario = (id) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            deleteUsuario(id);
        }
    };

    fetchUsuarios();
});
