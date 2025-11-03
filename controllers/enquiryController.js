const { Enquiry, Employee } = require('../models')


const createEnquiry = async (req, res) => {
  try {
    const { customerName, contactNumber, message } = req.body

    if (!customerName || !contactNumber) {
      return res.status(400).json({ message: 'Customer name and contact number are required' })
    }

    const enquiry = await Enquiry.create({
      customerName,
      contactNumber,
      message: message || '',
      assignedTo: null, 
    })

    res.status(201).json({ message: 'Enquiry created successfully', enquiry })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating enquiry' })
  }
}


const claimEnquiry = async (req, res) => {
  try {
    const { id } = req.params
    const employeeId = req.userId

    const enquiry = await Enquiry.findByPk(id)
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' })

    enquiry.assignedTo = employeeId
    await enquiry.save()

    res.json({ message: 'Enquiry claimed successfully', enquiry })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error claiming enquiry' })
  }
}


const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({
      include: { model: Employee, attributes: ['id', 'name', 'email'] },
    })
    res.json(enquiries)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching enquiries' })
  }
}


const getMyEnquiries = async (req, res) => {
  try {
    const employeeId = req.userId
    const myEnquiries = await Enquiry.findAll({
      where: { assignedTo: employeeId },
    })
    res.json(myEnquiries)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching your enquiries' })
  }
}

module.exports = {
  createEnquiry,
  claimEnquiry,
  getAllEnquiries,
  getMyEnquiries,
}
