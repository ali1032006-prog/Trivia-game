import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BACKGROUNDS, PALETTES } from "../theme";

const COUNT = 16;

// Full-screen gradient with drifting shapes. Sits behind everything and ignores touches.
export default function AnimatedBackground({ id, palette }) {
  const { width, height } = useWindowDimensions();
  const bg = BACKGROUNDS[id];
  const colors = bg.particle ? [bg.particle] : PALETTES[palette].answers;

  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: Math.random(),
        y: Math.random(),
        size: 10 + Math.random() * 26,
        delay: Math.random() * 5000,
        duration: 7000 + Math.random() * 7000,
      })),
    []
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient colors={bg.gradient} style={StyleSheet.absoluteFill} />
      {seeds.map((seed, i) => (
        <Particle
          key={`${id}-${i}`}
          kind={bg.kind}
          seed={seed}
          width={width}
          height={height}
          color={colors[i % colors.length]}
        />
      ))}
    </View>
  );
}

function Particle({ kind, seed, width, height, color }) {
  const progress = useRef(new Animated.Value(0)).current;
  const { size } = seed;

  useEffect(() => {
    progress.setValue(0);
    const run = Animated.sequence([
      Animated.delay(seed.delay),
      Animated.loop(
        Animated.timing(progress, {
          toValue: 1,
          duration: seed.duration,
          easing: kind === "twinkle" ? Easing.inOut(Easing.sin) : Easing.linear,
          useNativeDriver: true,
        })
      ),
    ]);
    run.start();
    return () => run.stop();
  }, [kind]);

  const left = seed.x * (width - size);
  const lerp = (from, to) => progress.interpolate({ inputRange: [0, 1], outputRange: [from, to] });

  if (kind === "twinkle") {
    return (
      <Animated.Text
        style={[
          styles.abs,
          {
            left,
            top: seed.y * height,
            fontSize: size,
            color,
            opacity: progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.15, 1, 0.15] }),
          },
        ]}
      >
        ✦
      </Animated.Text>
    );
  }

  if (kind === "fall") {
    return (
      <Animated.View
        style={[
          styles.abs,
          {
            left,
            width: size * 0.6,
            height: size,
            borderRadius: 3,
            backgroundColor: color,
            opacity: 0.8,
            transform: [{ translateY: lerp(-size * 2, height + size) }, { rotate: lerp("0deg", "360deg") }],
          },
        ]}
      />
    );
  }

  // rise (soft discs) and bubble (rings that sway)
  const bubble = kind === "bubble";
  return (
    <Animated.View
      style={[
        styles.abs,
        {
          left,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bubble ? "rgba(255,255,255,0.18)" : color,
          borderWidth: bubble ? 2 : 0,
          borderColor: "rgba(255,255,255,0.8)",
          opacity: bubble ? 1 : 0.4,
          transform: [
            { translateY: lerp(height + size, -size * 2) },
            { translateX: progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, bubble ? 14 : 0, 0] }) },
          ],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  abs: { position: "absolute", top: 0 },
});
