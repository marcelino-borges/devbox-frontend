export interface ITeamMember {
  id: number;
  firstName: string;
  lastName: string;
  mainRole: string;
  secondaryRoles: string[];
  memberSince: Date;
  picture: string;
}
