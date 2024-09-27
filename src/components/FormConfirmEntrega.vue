<template>
  <div class="form-container">
    <h1>Confirmação de Entrega</h1>
    <form @submit.prevent="submitForm">

      <div class="form-group">
        <label for="codigoFilial">Código da Filial <span class="required">*</span></label>
        <select id="codigoFilial" v-model="codigoFilial" :class="{ 'error-border': errors.codigoFilial }" required @change="filterEntregas">
          <option value="" disabled>Selecione uma filial</option>
          <option v-for="filial in filiais" :key="filial.codigo" :value="filial.codigo">{{ filial.codigo }} - {{ filial.nome }}</option>
        </select>
        <span v-if="errors.codigoFilial" class="error-msg">{{ errors.codigoFilial }}</span>
      </div>

      <div class="form-group">
        <label for="idEntrega">ID da Entrega <span class="required">*</span></label>
        <select id="idEntrega" v-model="idEntrega" :class="{ 'error-border': errors.idEntrega }" required :disabled="!codigoFilial">
          <option value="" disabled>Selecione uma entrega</option>
          <option v-for="entrega in entregasFiltradas" :key="entrega.id" :value="entrega.id">{{ entrega.id }} - {{ entrega.descricaoMercadoria }}</option>
        </select>
        <span v-if="errors.idEntrega" class="error-msg">{{ errors.idEntrega }}</span>
      </div>

      <button type="submit" class="btn">Confirmar Entrega</button>
    </form>
  </div>
</template>

<script>
import { buscarFiliais, buscarEntregas, atualizarEntrega } from '../service/solicitacaoEntrega'; 

export default {
  name: "FormConfirmEntrega",
  data() {
    return {
      codigoFilial: "",
      idEntrega: "",
      errors: {},
      filiais: [],  
      entregas: [],
      entregasFiltradas: [] 
    };
  },
  created() {
    this.fetchFiliais(); 
    this.fetchEntregas(); 
  },

  methods: {
    async fetchFiliais() {
      try {
        this.filiais = await buscarFiliais(); 
      } catch (error) {
        console.error('Erro ao buscar filiais:', error);
      }
    },

    async fetchEntregas() {
      try {
        this.entregas = await buscarEntregas(); 
        this.filterEntregas(); 
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
      }
    },

    filterEntregas() {
      if (this.codigoFilial) {
        this.entregasFiltradas = this.entregas.filter(entrega => 
          entrega.filialDestino === this.codigoFilial && entrega.status === 'PENDING'
        );
      } else {
        this.entregasFiltradas = this.entregas.filter(entrega => entrega.status === 'PENDING'); 
      }
      this.idEntrega = ""; 
    },

    validateForm() {
      this.errors = {};

      if (!this.codigoFilial) {
        this.errors.codigoFilial = "O campo código da filial é obrigatório.";
      }
      if (!this.idEntrega) {
        this.errors.idEntrega = "O campo ID da entrega é obrigatório.";
      }

      return Object.keys(this.errors).length === 0;
    },

    async submitForm() {
      if (this.validateForm()) {
        try {
          await atualizarEntrega(this.idEntrega);
          alert(`Entrega confirmada! Código da Filial: ${this.codigoFilial}, ID da Entrega: ${this.idEntrega}`);
          this.limparFormulario();
        } catch (error) {
          console.error('Erro ao confirmar entrega:', error);
          alert('Houve um erro ao confirmar a entrega. Tente novamente.');
        }
      }
    },
    
    limparFormulario() {
      this.codigoFilial = "";
      this.idEntrega = "";
      this.entregasFiltradas = []; 
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

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border 0.3s ease;
}

select:focus {
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
