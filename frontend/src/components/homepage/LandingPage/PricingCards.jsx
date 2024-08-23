import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import { Link } from 'react-router-dom';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/joy/Button';

export default function PricingCards() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
        gap: 2,
      }}
    >
      {/* Card 1: Find Investors */}
      <Card size="lg" variant="outlined" sx={{ backgroundColor: '#040F15', color: 'white' }}>
        <Chip size="sm" variant="outlined" color="neutral">
          Service
        </Chip>
        <Typography level="h2" sx={{ color: 'white' }}>
          Find Investors
        </Typography>
        <Divider inset="none" />
        <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            See available Investors
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Make Appointments
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Schedule meetings
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Build your profile
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Button
            variant="soft"
            color="neutral"
            component={Link}
            to="/signUp"
            endDecorator={<KeyboardArrowRight />}
          >
            Start now
          </Button>
        </CardActions>
      </Card>

      {/* Card 2: Find Mentors */}
      <Card size="lg" variant="outlined" sx={{ backgroundColor: '#040F15', color: 'white' }}>
        <Chip size="sm" variant="outlined" color="neutral">
          Service
        </Chip>
        <Typography level="h2" sx={{ color: 'white' }}>
          Find Mentors
        </Typography>
        <Divider inset="none" />
        <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            See available Mentors
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Make Appointments
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Schedule meetings
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Build your profile
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Button
            variant="soft"
            color="neutral"
            component={Link}
            to="/signUp"
            endDecorator={<KeyboardArrowRight />}
          >
            Start now
          </Button>
        </CardActions>
      </Card>

      {/* Card 3: Blogs */}
      <Card size="lg" variant="outlined" sx={{ backgroundColor: '#040F15', color: 'white' }}>
        <Chip size="sm" variant="outlined" color="neutral">
          Service
        </Chip>
        <Typography level="h2" sx={{ color: 'white' }}>
          Blogs
        </Typography>
        <Divider inset="none" />
        <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Read mind-blowing Blogs
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Write and inspire a wide community
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Get inspired
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Build your profile
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Button
            variant="soft"
            color="neutral"
            component={Link}
            to="/signUp"
            endDecorator={<KeyboardArrowRight />}
          >
            Start now
          </Button>
        </CardActions>
      </Card>

      {/* Card 4: Communities */}
      <Card size="lg" variant="outlined" sx={{ backgroundColor: '#040F15', color: 'white' }}>
        <Chip size="sm" variant="outlined" color="neutral">
          Service
        </Chip>
        <Typography level="h2" sx={{ color: 'white' }}>
          Communities
        </Typography>
        <Divider inset="none" />
        <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            See available Communities
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Get Engaged
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Connect, Inspire and get Inspired
          </ListItem>
          <ListItem sx={{ color: 'white' }}>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Comment, talk and engage
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Button
            variant="soft"
            color="neutral"
            component={Link}
            to="/signUp"
            endDecorator={<KeyboardArrowRight />}
          >
            Start now
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
