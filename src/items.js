
const items = [
  { "id": 1, "name": "Item1" },
  { "id": 2, "name": "Item2" },
  { "id": 3, "name": "Item3" },
  { "id": 4, "name": "Item4" },
  { "id": 5, "name": "Item5" },
];

// Get all items

const getItems = (req, res) => {
  if (items.length > 0) {
    console.log(items);
    res.json(items);
  } else {
    return res.status(404).json({message: "Items not found"});
  }
}

// Get item by ID

const getItemsId = (req, res) => {

  const item = items.find((item) => item.id == req.params.id);

  if (item) {
    res.json(item);
  } else {
    return res.status(404).json({message: "Item not found"});
  }
}

// Add new item

const addNewItem = (req, res) => {
  console.log('addItem request body', req.body);

  if (req.body.name) {

    let newItem;

    if (items.length > 0) {
      const latestId = items[items.length-1].id;
      newItem = {id: latestId + 1, name: req.body.name};
    }
    // prevents internal server error 500 if items is empty
    else {
      newItem = {id: 1, name: req.body.name};
    }
    items.push(newItem);
    console.log("New item created with id", newItem.id)
    return res.status(201).json({message: 'Item added.'});

   }
    else {
    res.status(400);
    return res.json({message: 'Request is missing name property'});
  }

};

// Update item
const updateItem = (req, res) => {

  const item = items.find((item) => item.id == req.params.id);

  if (item) {
    item.name = req.body.name
    console.log(req.body.name)
    res.json(item);
  } else {
    return res.status(404).json({message: "Item not found"});
  }

}

// Delete item
const deleteItem = (req, res) => {

  const item = items.findIndex((item) => item.id == req.params.id);

  if (item !== -1) {
    const deletedItem = items.splice(item, 1)[0];
    console.log("deleted item", deletedItem);
    console.log("items", items);
    return res.status(200).json({message: `Item ${deletedItem.id} deleted`});
  } else if (items.length < 1) {
    return res.status(204).json({message: "No items to be deleted!"});
  } else {
    return res.status(404).json({message: "Item not found"});
  }

}

export {getItems, getItemsId, addNewItem, updateItem, deleteItem};
