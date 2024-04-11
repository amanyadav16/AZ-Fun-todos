import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getMongoDBConnectiton } from "../Connections/mongoDBConnection";
import Todo from "../models/todo";

export async function todos(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

	getMongoDBConnectiton();

	try {
		const todos = await Todo.find();
		return {
			jsonBody: { message: "Successfully fetched todos!!", data: todos },
			status: 200,
		};
	} catch (err) {
		return {
			body: "error in fetching todos",
			status: 500,
		};
	}
};

app.http('todos', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: todos,
    route:'todos/getAll'
});
