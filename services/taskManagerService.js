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
  const listCards = await taskManagerClient.getCardsOnList(listId);
  return listCards.filter((card) => card.name.startsWith("bug-")).length + 1;
};

const randomizeTitle = async (desc, listId) => {
  const randomWord = desc.split(" ").slice(0, 5).join("_");
  const bugNumber = await getBugNumber(listId);
  return `bug-${randomWord}-${bugNumber}`;
};

const getIdLabelByCategory = async (category) => {
  const labels = await taskManagerClient.getLabelsForBoard(
    process.env.TRELLO_BOARD_ID
  );
  return [labels.find((label) => label.name === category).id];
};

const getRandomMemberId = async () => {
  const membersIds = await taskManagerClient.getBoardMembers(
    process.env.TRELLO_BOARD_ID
  );
  return [membersIds[Math.floor(Math.random() * membersIds.length)].id];
};

const getBugLabel = async () => {
  const labels = await taskManagerClient.getLabelsForBoard(
    process.env.TRELLO_BOARD_ID
  );
  return [labels.find((label) => label.name === "Bug").id];
};

const buildCard = async ({ type, title, description, category }) => {
  let name = title;
  const extraParams = {
    desc: description,
  };
  const listId = await getListId();

  //FIXME refactor to scale if new flavors are added
  switch (type) {
    case "bug":
      name = await randomizeTitle(description, listId);
      extraParams.idMembers = await getRandomMemberId();
      extraParams.idLabels = await getBugLabel();
      break;
    case "issue":
      //TODO check if exists? (It was not specified)
      break;
    case "task":
      extraParams.idLabels = await getIdLabelByCategory(category);
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
