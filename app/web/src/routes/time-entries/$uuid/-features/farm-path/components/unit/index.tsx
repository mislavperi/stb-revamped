import { FC } from 'react'
import { Avatar, Box, Flex, Image, Stack, Text, Title } from '@mantine/core'

import { FarmPathUnit } from '@/api/types/farmPath'
import classes from './styles.module.scss'

export const UnitDisplay: FC<UnitDisplay> = ({ slug, alignment, unitName, gearLevelRec, relicLevelRec }) => {
  return (
    <Stack>
      <Flex>
        <Box display='flex' pos='relative' key={slug}>
          <Avatar size='80px' src={'/characters/' + slug + '.png'} />
          {gearLevelRec >= 13 ? <Image className={classes.gearLevel} src={'/g13-' + alignment + '.png'} /> : null}
          {relicLevelRec > 0 ? (
            <>
              <Image className={classes.relicLevelIcon} src={'/relic-level-' + alignment + '.png'} />
              <Title order={6} className={classes.relicLevel} c='white'>
                {relicLevelRec}
              </Title>
            </>
          ) : null}
        </Box>
      </Flex>
      <Text truncate maw='100px' fw={500}>
        {unitName}
      </Text>
    </Stack>
  )
}

type UnitDisplay = FarmPathUnit
