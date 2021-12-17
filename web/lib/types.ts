export interface Group {
  groupName: string;
  timelines: GroupElement[];
}

export interface GroupElement {
  timelineName: string;
  events: Events;
}

export interface Events {
  versions: Array<string[]>;
  milestones: Array<string[]>;
}
