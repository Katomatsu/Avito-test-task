export interface CommentsModel {
	by: string;
	id: number;
	kids: number[];
	parent: number;
	text: string;
	time: number;
	type: string;
	deleted?: true;
  dead?: true
}
