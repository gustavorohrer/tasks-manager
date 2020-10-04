const { taskManagerClient } = require("../clients/taskManagerClient");

const getListId = async () => {
  const lists = await taskManagerClient.getListsOnBoard(
    process.env.TRELLO_BOARD_ID
  );
  const toDoList = lists.find((list) => list.name === "To Do");
  if (!toDoList) throw Error("To Do list does not exist!");
  return toDoList.id;
};

const getBugNumber = async (listId) => {
  //TODO
};

const randomizeTitle = (desc, listId) => {
  const randomWord = desc.split(" ").slice(0, 5).join("_");
  const bugNumber = getBugNumber(listId);
  return `bug-${randomWord}-${bugNumber}`;
};

function getIdLabelByCategory() {
  //TODO
  return undefined;
}

const buildCard = async ({ type, title, description, category }) => {
  let name = title;

  const extraParams = {
    desc: description,
  };

  const listId = await getListId();

  //FIXME refactor to scale if new flavors are added
  switch (type) {
    case "bug":
      name = randomizeTitle(description, listId);
      extraParams.idMembers = []; //TODO refactor this
      extraParams.idLabels = []; //TODO refactor this
      break;
    case "issue":
      //TODO check if exists?
      break;
    case "task":
      extraParams.idLabels = getIdLabelByCategory(category);
      break;
    default:
      throw Error("Invalid card type!");
  }

  return {
    name,
    extraParams,
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
