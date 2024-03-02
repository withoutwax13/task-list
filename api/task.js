import {
  ListGlobalTablesCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "us-west-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const fetchTasks = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name, completed",
    TableName: "Tasks",
  });
  const response = await ddbDocClient.send(command);
  return response;
};

export const createTasks = async ({ name, completed }) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Tasks",
    Item: {
      id: uuid,
      name,
      completed,
    },
  });
  const response = await ddbDocClient.send(command);
  return response;
};

export const updateTasks = async ({ id, name, completed }) => {
  const command = new UpdateCommand({
    TableName: "Tasks",
    Key: { id },
    UpdateExpression: "set #name = :n, completed = :c",
    ExpressionAttributeNames: { ":n": name, ":c": completed },
    ReturnValues: "ALL_NEW"
  });
  const response = await ddbDocClient.send(command);
  return response;
};

export const deleteTasks = async (id) => {
  const command = new DeleteCommand({
    TableName: "Tasks",
    Key: { id },
  });
  const response = await ddbDocClient.send(command);
  return response;
};