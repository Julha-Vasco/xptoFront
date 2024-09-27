<template>
  <div class="form-container">
    <h1>Pré-cadastro de Filial</h1>
    <form @submit.prevent="submitForm">

      <div class="form-group">
        <label for="codigo">Código <span class="required">*</span></label>
        <input type="text" id="codigo" v-model="codigo" :class="{ 'error-border': errors.codigo }" placeholder="Digite o código da filial" required>
        <span v-if="errors.codigo" class="error-msg">{{ errors.codigo }}</span>
      </div>

      <div class="form-group">
        <label for="nome">Nome filial <span class="required">*</span></label>
        <input type="text" id="nome" v-model="nome" :class="{ 'error-border': errors.nome }" placeholder="Digite o nome da filial" required>
        <span v-if="errors.nome" class="error-msg">{{ errors.nome }}</span>
      </div>

      <div class="form-group">
        <label for="endereco">Endereço <span class="required">*</span></label>
        <input type="text" id="endereco" v-model="endereco" :class="{ 'error-border': errors.endereco }" placeholder="Digite o endereço" required>
        <span v-if="errors.endereco" class="error-msg">{{ errors.endereco }}</span>
      </div>

      <div class="form-group">
        <label for="responsavel">Responsável Almoxarifado <span class="required">*</span></label>
        <input type="text" id="responsavel" v-model="responsavel" :class="{ 'error-border': errors.responsavel }" placeholder="Digite o código do responsável" required>
        <span v-if="errors.responsavel" class="error-msg">{{ errors.responsavel }}</span>
      </div>

      <button type="submit" class="btn">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import { FilialService } from '../service/preCadservice'; 

export default {
  name: "FormPreCad",
  data() {
    return {
      codigo: "",
      nome: "",
      endereco: "",
      responsavel: "",
      errors: {},
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
     
      if (!this.codigo) this.errors.codigo = "O campo código é obrigatório.";
      if (!this.nome) this.errors.nome = "O campo nome é obrigatório.";
      if (!this.endereco) this.errors.endereco = "O campo endereço é obrigatório.";
      if (!this.responsavel) this.errors.responsavel = "O campo responsável é obrigatório.";
      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (this.validateForm()) {
        const newFilial = {
          codigo: this.codigo,
          nome: this.nome,
          endereco: this.endereco,
          responsavel: this.responsavel,
        };
        try {
          await FilialService.createFilial(newFilial);
          alert("Filial cadastrada com sucesso!");
          this.limparFormulario();
        } catch (error) {
          alert(`Erro ao cadastrar filial: ${error.message}`);
        }
      }
    },
    limparFormulario() {
      this.codigo = "";
      this.nome = "";
      this.endereco = "";
      this.responsavel = "";
    }
  }
};
</script>



<style scoped>
.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.required {
  color: red;
}

input[type="text"], select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition: border 0.3s ease;
}

input[type="text"]:focus, select:focus {
  border-color: #007bff;
  outline: none;
}

.error-border {
  border-color: red;
}

.error-msg {
  color: red;
  font-size: 12px;
}

button.btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

button.btn:hover {
  background-color: #0056b3;
}
</style>
