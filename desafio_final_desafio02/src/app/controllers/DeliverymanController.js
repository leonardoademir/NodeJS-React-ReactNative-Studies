/* eslint-disable class-methods-use-this */
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import * as Yup from 'yup';

class DeliverymanController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const deliverymans = await Deliveryman.findAll({
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });

    return res.json(deliverymans);
  }

  async update(req, res) {
    // const notification = await Notification.findById(req.params.id);


    const deliveryman = await Deliveryman.findByPk(req.params.id_deliveryman);

    if(!deliveryman){
      return res.status(401).json({error: 'The ID of the Deliveryman doesnt exist!!!'});
    }

    const { name, email, avatar_id } = deliveryman.update(req.body);

    return res.json({ deliveryman });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const deliverymanExists = await Deliveryman.findOne({ where: { email: req.body.email } });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }

    const { name, email } = await Deliveryman.create(req.body);
    return res.json({
      name,
      email,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findOne({
      where: { id: req.params.id_deliveryman },
    });

    if (!deliveryman) {
      return res.status(400).json({ Error: 'User ID does not exist!' });
    }

    deliveryman.destroy();
    return res.status(200).json({ Message: 'SUCCESS' });
  }

}

export default new DeliverymanController();
