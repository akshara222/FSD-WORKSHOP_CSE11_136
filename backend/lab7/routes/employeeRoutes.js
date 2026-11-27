
const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');

// 1. Add Employee
router.post('/add', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();

        res.status(201).json({
            message: "Employee added successfully",
            employee
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get All Employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Get Employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({
            employeeId: req.params.id
        });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update Employee
router.put('/:id', async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate(
            { employeeId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json({
            message: "Employee updated successfully",
            employee
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete Employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({
            employeeId: req.params.id
        });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
