/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const data = await Recipient.findAll({});

    return res.json(data);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string()
        .required(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Create the recipient
    const recipient = await Recipient.create(req.body).catch((error) => {
      throw error;
    });

    return res.json(recipient);
  }
}

export default new RecipientController();
