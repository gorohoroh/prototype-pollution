import User from "../model/user.model.js";
import TodoItem from "../model/todoitem.model.js";

export default async function seedDatabase() {

    const seedUsers = [
        {username: 'Jason', isAdmin: true},
        {username: 'Kelly'},
        {username: 'Paul'},
        {username: 'Alexandra'},
    ];

    const seedTodoItems = [
        {
            text: "Jason's first todo item",
            open: true,
            visible: true,
            owner: "Jason"
        },
        {
            text: "First todo for Kelly",
            open: true,
            visible: true,
            owner: "Kelly"
        },
        {
            text: "Paul's thing to be done",
            open: true,
            visible: true,
            owner: "Paul"
        },
        {
            text: "A HIDDEN TODO",
            open: true,
            owner: "Alexandra"
        }
    ]

    try {
        User.deleteMany({});
        User.insertMany(seedUsers)
            .then(insertedUsers => {
                console.log(`Seed users created: ${insertedUsers.length}`);

                seedTodoItems.map(item => {
                    item.owner = insertedUsers.find(x => x.username === item.owner);
                    return item;
                })
                TodoItem.insertMany(seedTodoItems)
                    .then(insertedTodos => console.log(`Seed todo items created: ${insertedTodos.length}`))
                    .catch(error => console.log(`Todo item insertion failed: ${error}`))
            })
            .catch(error => console.log(`Seed user insertion failed: ${error}`));

    } catch (error) {
        console.log(`There was a problem seeding the database: ${error.message}`)
    }
}