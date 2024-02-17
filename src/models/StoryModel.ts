export interface StoryModel {
	by: string;
	descendants: number;
	id: number;
	kids: number[] | undefined;
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
}
