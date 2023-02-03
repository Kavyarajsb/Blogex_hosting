const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://Kavyarajsb2000:kavya2000@cluster0.hlvfkab.mongodb.net/ContentManagement?retryWrites=true&w=majority')
.then(() => { console.log('MongoDB connected successfully');})
.catch( error => { console.log('MongoDB error - '+ error);})