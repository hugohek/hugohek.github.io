import { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import ProjectCard from '../components/ProjectCard';

const INITIAL_PROJECTS = [
  {
    id: 1,
    name: 'Smart Home Hub',
    description: 'Build an IoT gateway using Raspberry Pi and sensor modules.',
    members: ['alice', 'bob'],
    hardwareSets: [
      { id: 'hs1', name: 'HW Set 1 — Raspberry Pi 4', capacity: 10, available: 7 },
      { id: 'hs2', name: 'HW Set 2 — Sensor Pack', capacity: 50, available: 20 },
    ],
  },
  {
    id: 2,
    name: 'Autonomous Rover',
    description: 'Develop a line-following robot with obstacle avoidance.',
    members: ['carol'],
    hardwareSets: [
      { id: 'hs3', name: 'HW Set 1 — Motor Controllers', capacity: 20, available: 15 },
      { id: 'hs4', name: 'HW Set 2 — Ultrasonic Sensors', capacity: 30, available: 30 },
    ],
  },
  {
    id: 3,
    name: 'Signal Processor',
    description: 'Implement real-time FFT on a Xilinx FPGA development board.',
    members: [],
    hardwareSets: [
      { id: 'hs5', name: 'HW Set 1 — Boards', capacity: 5, available: 5 },
      { id: 'hs6', name: 'HW Set 2 — Oscilloscope Probes', capacity: 8, available: 2 },
    ],
  },
];

const CURRENT_USER = 'favour';

export default function Projects() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  // Join a project
  const handleJoin = (projectId) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId && !p.members.includes(CURRENT_USER)
          ? { ...p, members: [...p.members, CURRENT_USER] }
          : p
      )
    );
  };

  // Leave a project
  const handleLeave = (projectId) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, members: p.members.filter((m) => m !== CURRENT_USER) }
          : p
      )
    );
  };

  // Check out hardware (decrease available)
  const handleCheckOut = (projectId, hwSetId, qty) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              hardwareSets: p.hardwareSets.map((hw) =>
                hw.id === hwSetId
                  ? { ...hw, available: Math.max(0, hw.available - qty) }
                  : hw
              ),
            }
          : p
      )
    );
  };

  // Check in hardware (increase available)
  const handleCheckIn = (projectId, hwSetId, qty) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              hardwareSets: p.hardwareSets.map((hw) =>
                hw.id === hwSetId
                  ? { ...hw, available: Math.min(hw.capacity, hw.available + qty) }
                  : hw
              ),
            }
          : p
      )
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* MUI AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hardware Checkout — Projects
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Logged in as: <strong>{CURRENT_USER}</strong>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Available Projects
        </Typography>

        {/* ProjectCard reused for every project */}
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            currentUser={CURRENT_USER}
            onJoin={handleJoin}
            onLeave={handleLeave}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        ))}
      </Container>
    </Box>
  );
}
