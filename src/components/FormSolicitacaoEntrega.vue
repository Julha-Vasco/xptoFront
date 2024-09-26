<template>
  <div class="form-container">
    <h1>Solicitação de Entrega</h1>
    <form @submit.prevent="submitForm">
 
      <div class="form-group">
        <label for="cep-origem">CEP Origem <span class="required">*</span></label>
        <input type="text" id="cep-origem" v-model="cepOrigem" :class="{ 'error-border': errors.cepOrigem }" placeholder="Digite o CEP" required @blur="buscarEndereco">
        <span v-if="errors.cepOrigem" class="error-msg">{{ errors.cepOrigem }}</span>
      </div>

      <div class="form-group">
        <label for="rua">Rua <span class="required">*</span></label>
        <input type="text" id="rua" v-model="rua" readonly required>
      </div>

      <div class="form-group">
        <label for="cidade">Cidade <span class="required">*</span></label>
        <input type="text" id="cidade" v-model="cidade" readonly required>
      </div>

      <div class="form-group">
        <label for="estado">Estado <span class="required">*</span></label>
        <input type="text" id="estado" v-model="estado" readonly required>
      </div>

      <div class="form-group">
        <label for="filial-destino">Filial Destino <span class="required">*</span></label>
        <select id="filial-destino" v-model="filialDestino" :class="{ 'error-border': errors.filialDestino }" required>
          <option disabled value="">Selecione a filial</option>
          <option v-for="filial in filiais" :key="filial.id" :value="filial.id">{{ filial.nome }}</option>
        </select>
        <span v-if="errors.filialDestino" class="error-msg">{{ errors.filialDestino }}</span>
      </div>

      <div class="form-group">
        <label for="prazo-entrega">Prazo da Entrega <span class="required">*</span></label>
        <input type="date" id="prazo-entrega" v-model="prazoEntrega" @change="validarPrazo" :class="{ 'error-border': errors.prazoEntrega }" required>
        <span v-if="errors.prazoEntrega" class="error-msg">{{ errors.prazoEntrega }}</span>
      </div>

      <div class="form-group">
        <label for="descricao-mercadoria">Descrição da Mercadoria <span class="required">*</span></label>
        <textarea id="descricao-mercadoria" v-model="descricaoMercadoria" :class="{ 'error-border': errors.descricaoMercadoria }" required placeholder="Descreva a mercadoria..."></textarea>
        <span v-if="errors.descricaoMercadoria" class="error-msg">{{ errors.descricaoMercadoria }}</span>
      </div>

      <button type="submit" class="btn">Solicitar Entrega</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormSolicitacaoEntrega",
  data() {
    return {
      cepOrigem: "",
      rua: "",
      cidade: "",
      estado: "",
      filialDestino: "",
      prazoEntrega: "",
      descricaoMercadoria: "",
      filiais: [
        { id: 1, nome: "Filial A" },
        { id: 2, nome: "Filial B" },
        { id: 3, nome: "Filial C" },
      ],
      errors: {},
    };
  },
  methods: {
    buscarEndereco() {
      const cep = this.cepOrigem.replace(/\D/g, '');
      if (cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (!data.erro) {
              this.rua = data.logradouro;
              this.cidade = data.localidade;
              this.estado = data.uf;
              this.errors.cepOrigem = null; 
            } else {
              this.errors.cepOrigem = "CEP não encontrado.";
              this.limparEndereco();
            }
          })
          .catch(error => {
            this.errors.cepOrigem = "Erro ao buscar CEP.";
            this.limparEndereco();
          });
      }
    },
    validarPrazo() {
      const dataAtual = new Date();
      const dataPrazo = new Date(this.prazoEntrega);
      if (dataPrazo < dataAtual) {
        this.errors.prazoEntrega = "O prazo de entrega não pode ser anterior ou igual à data atual.";
      } else {
        this.errors.prazoEntrega = null; 
      }
    },
    validateForm() {
      this.errors = {};
      if (!this.cepOrigem) {
        this.errors.cepOrigem = "O campo CEP é obrigatório.";
      }
      if (!this.rua) {
        this.errors.rua = "O campo Rua é obrigatório.";
      }
      if (!this.cidade) {
        this.errors.cidade = "O campo Cidade é obrigatório.";
      }
      if (!this.estado) {
        this.errors.estado = "O campo Estado é obrigatório.";
      }
      if (!this.filialDestino) {
        this.errors.filialDestino = "O campo Filial é obrigatório.";
      }
      if (!this.prazoEntrega) {
        this.errors.prazoEntrega = "O campo Prazo de Entrega é obrigatório.";
      }
      if (!this.descricaoMercadoria) {
        this.errors.descricaoMercadoria = "O campo Descrição da Mercadoria é obrigatório.";
      }

      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        alert("Formulário enviado com sucesso!");
        this.limparFormulario();
      }
    },
    limparEndereco() {
      this.rua = "";
      this.cidade = "";
      this.estado = "";
    },
    limparFormulario() {
      this.cepOrigem = "";
      this.rua = "";
      this.cidade = "";
      this.estado = "";
      this.filialDestino = "";
      this.prazoEntrega = "";
      this.descricaoMercadoria = "";
    },
  },
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

input[type="text"],
input[type="date"],
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition: border 0.3s ease;
}

input[type="text"]:focus,
input[type="date"]:focus,
select:focus,
textarea:focus {
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
