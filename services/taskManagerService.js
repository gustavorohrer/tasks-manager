const { taskManagerClient } = require("../clients/taskManagerClient");

const getListId = async () => {
  const lists = await taskManagerClient.getListsOnBoard(
    process.env.TRELLO_BOARD_ID
  );
  const toDoList = lists.find((list) => list.name === "To Do");
  if (!toDoList) throw Error("To Do list does not exist!");
  return toDoList.id;
};

const buildCard = async (body) => {
  //if it is a bug: 1) randomize title, 2) assign random member, 3) put "Bug" label
  //if it is a task: label it with category
  const listId = await getListId();
  return {
    name: body.title,
    extraParams: {
      description: body.description,
    },
    listId,
  };
};

exports.createCard = async (body) => {
  const card = await buildCard(body);
  return await taskManagerClient.addCardWithExtraParams(
    card.name,
    card.extraParams,
    card.listId
  );
};
