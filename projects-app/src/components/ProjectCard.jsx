import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import HardwareSet from './HardwareSet';

/**
 * ProjectCard — displays a single project with its hardware sets.
 * Props:
 *   project     : { id, name, description, members, hardwareSets }
 *   currentUser : string
 *   onJoin      : (projectId) => void
 *   onLeave     : (projectId) => void
 *   onCheckIn   : (projectId, hwSetId, qty) => void
 *   onCheckOut  : (projectId, hwSetId, qty) => void
 */
export default function ProjectCard({
  project,
  currentUser,
  onJoin,
  onLeave,
  onCheckIn,
  onCheckOut,
}) {
  const isMember = project.members.includes(currentUser);

  return (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardHeader
        title={project.name}
        subheader={project.description}
        action={
          isMember ? (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => onLeave(project.id)}
              sx={{ mt: 1, mr: 1 }}
            >
              Leave Project
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onJoin(project.id)}
              sx={{ mt: 1, mr: 1 }}
            >
              Join Project
            </Button>
          )
        }
      />

      <Divider />

      <CardContent>
        {/* Member chips */}
        <Typography variant="overline" color="text.secondary">
          Members
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
          {project.members.length === 0 ? (
            <Typography variant="body2" color="text.disabled">
              No members yet.
            </Typography>
          ) : (
            project.members.map((m) => (
              <Chip
                key={m}
                label={m}
                size="small"
                color={m === currentUser ? 'primary' : 'default'}
                variant={m === currentUser ? 'filled' : 'outlined'}
              />
            ))
          )}
        </Stack>

        {/* Hardware sets — HardwareSet reused for each entry */}
        <Typography variant="overline" color="text.secondary">
          Hardware Sets
        </Typography>
        {project.hardwareSets.map((hw) => (
          <HardwareSet
            key={hw.id}
            hwSet={hw}
            isMember={isMember}
            onCheckIn={(hwSetId, qty) => onCheckIn(project.id, hwSetId, qty)}
            onCheckOut={(hwSetId, qty) => onCheckOut(project.id, hwSetId, qty)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
