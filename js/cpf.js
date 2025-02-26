document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 3) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
    }
    if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
    }
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
    }
    e.target.value = value;
  });
  