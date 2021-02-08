<template>
  <v-container>
    <v-card color="#EEEEEE" elevation="1">
      <v-card-title class="fontStyles">
        {{
          updateBtn ? "Update Customer Details" : "Add New Customer"
        }}</v-card-title
      >
      <!-- Add new customer form -->
      <v-card-text>
        <v-row>
          <v-flex class="pa-4" xs12 sm8 md8 lg6 xl6>
            <v-form ref="addCustomerForm">
              <v-text-field
                v-model="data.name"
                color="#5E35B1"
                :rules="rules"
                :error="checkUsernameValidation().error"
                :error-messages="checkUsernameValidation().message"
                maxlength="20"
                minlength="05"
                label="Name"
                placeholder="Name"
                outlined
                counter
              ></v-text-field>
              <v-text-field
                v-model="data.email"
                color="#5E35B1"
                :rules="rules"
                :error="checkEmailValidation().error || emailError"
                :error-messages="
                  checkEmailValidation().message || emailErrorMsg
                "
                maxlength="20"
                minlength="05"
                :disabled="updateBtn"
                label="E-mail"
                outlined
                counter
              ></v-text-field>
              <v-text-field
                v-model="data.phone"
                color="#5E35B1"
                :rules="rules"
                :error="checkPhoneValidation().error"
                :error-messages="checkPhoneValidation().message"
                maxlength="10"
                minlength="10"
                label="Phone"
                outlined
                counter
              ></v-text-field>
            </v-form>
          </v-flex>
          <v-flex xs4 sm4 md4 lg2 xl10>
            <v-row justify="center" align="center">
              <v-btn
                class="submitBtnStyles primary text-none"
                :disabled="checkSubmitBtnDisable()"
                color="success"
                @click="updateBtn ? onUpdate() : onSubmit()"
              >
                {{ updateBtn ? "Update" : "Submit" }}
              </v-btn>
            </v-row>
          </v-flex>
        </v-row>
      </v-card-text>
    </v-card>
    <br />
    <!-- Available Customers Section -->
    <v-card color="#EEEEEE" elevation="1">
      <v-card-title class="fontStyles"> Available Customers </v-card-title>
      <v-flex lg12>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              color="#5E35B1"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="storeData" :search="search">
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                color="green"
                @click="editUserDetails(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon small color="#D50000" @click="deleteUserDetails(item)">
                mdi-delete
              </v-icon>
            </template></v-data-table
          >
        </v-card>
      </v-flex>
    </v-card>
  </v-container>
</template>

<script>
import "@/styles/home.scss";
import store from "@/store";

export default {
  data() {
    return {
      updateBtn: false,
      data: {
        name: "",
        email: "",
        phone: "",
      },
      storeData: [],
      rules: [(v) => Boolean(v) || "Required"],
      search: "",
      editedIndex: "",
      emailError: false,
      emailErrorMsg: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.storeData = store.getters["userStore/userData"].userDetails;
  },
  methods: {
    onSubmit() {
      let isCustomerPresent = false;
      for (let i = 0; i < this.storeData.length; i++) {
        if (this.storeData[i].email === this.data.email)
          isCustomerPresent = true;
      }
      if (!isCustomerPresent) {
        this.storeData.push(this.data);
        this.updateStoreDetails();
        this.data = {
          name: "",
          email: "",
          phone: "",
        };
        this.$refs.addCustomerForm.resetValidation();
        this.emailError = false;
        this.emailErrorMsg = "";
      } else {
        this.emailError = true;
        this.emailErrorMsg = "E-mail ID already exists";
      }
    },
    editUserDetails(item) {
      this.editedIndex = this.storeData.indexOf(item);
      this.data = Object.assign({}, item);
      this.updateBtn = true;
    },
    deleteUserDetails(item) {
      this.storeData = this.storeData.filter(
        (data) => data.email !== item.email
      );
      this.updateStoreDetails();
    },
    onUpdate() {
      if (this.editedIndex > -1) {
        Object.assign(this.storeData[this.editedIndex], this.data);
        this.updateStoreDetails();
        this.updateBtn = false;
        this.data = {};
        this.$refs.addCustomerForm.resetValidation();
      } else {
        this.storeData.push(this.data);
        this.$refs.addCustomerForm.resetValidation();
      }
    },
    checkSubmitBtnDisable() {
      if (
        this.data.name &&
        this.data.name.length &&
        this.data.email &&
        this.data.email.length &&
        this.data.phone &&
        this.data.phone.length &&
        !this.checkUsernameValidation().error &&
        !this.checkEmailValidation().error &&
        !this.checkPhoneValidation().error
      ) {
        return false;
      }
      return true;
    },
    updateStoreDetails() {
      store.dispatch("userStore/setUserData", {
        userDetails: this.storeData,
      });
    },
    checkUsernameValidation() {
      if (this.data.name && !/[A-Za-z]+$/.test(this.data.name)) {
        return this.returnValidation(true);
      }
      return this.returnValidation(false);
    },
    checkEmailValidation() {
      if (this.data.email && !/.+@.+$/.test(this.data.email)) {
        return this.returnValidation(true);
      }
      return this.returnValidation(false);
    },
    checkPhoneValidation() {
      if (this.data.phone && !/^\d+$/.test(this.data.phone)) {
        return this.returnValidation(true);
      }
      return this.returnValidation(false);
    },
    returnValidation(isValid) {
      if (isValid) {
        return {
          error: true,
          message: "Invalid Input",
        };
      } else {
        return {
          error: false,
          message: "",
        };
      }
    },
  },
};
</script>
<style scoped>
label[for="required"]::after {
  color: red;
  content: "*";
}
</style>
