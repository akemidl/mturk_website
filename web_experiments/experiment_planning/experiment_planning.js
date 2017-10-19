

var welcome = {
  type: 'text',
  text: "Welcome!\n<p>\nPress <b>space</b> to continue.\n"
};

var trial = {
  type: 'mouselab-mdp',
	graph: {"0_1": {"down": [-2, "0_2"], "right": [9, "1_1"]}, "0_2": {"right": [9, "1_2"]}, "1_1": {"down": [-7, "1_2"], "right": [1, "2_1"]}, "2_0": {"down": [8, "2_1"]}, "0_0": {"down": [-5, "0_1"], "right": [3, "1_0"]}, "1_0": {"down": [6, "1_1"], "right": [-6, "2_0"]}, "2_1": {"down": [-6, "2_2"]}, "2_2": {}, "1_2": {"right": [-7, "2_2"]}},
	layout: {"0_1": [0, 1], "0_2": [0, 2], "1_1": [1, 1], "2_0": [2, 0],
	"0_0": [0, 0], "1_0": [1, 0], "2_1": [2, 1], "2_2": [2, 2], "1_2": [1, 2]},
  initial: "0_0",
	stateLabels: {"0_1": "\ud83d\ude18", "0_2": "\ud83d\ude0b", "1_1": "\ud83d\ude0c",
	"2_0": "\ud83d\ude19", "0_0": "\ud83d\ude0a", "2_1":
	"\ufe0f", "1_2": "\ud83d\ude0e", "1_0": "\ud83d\ude1d", "2_2": "\ud83d\ude18"},
  edgeDisplay:"hover",
  edgeClickCost: 0,
  stimId: 1994,
  playerImage: '/web_experiments/experiment_planning/plane.png',
  playerImageScale: 0.3,
  size: 120,
  leftMessage: 'Left Message',
  centerMessage: 'Center Message'
};

var timeline = [welcome,trial];

jsPsych.init({
	timeline: timeline,
	on_finish: function() {
		//save_data(jsPsych.data.getData());
	}
})
