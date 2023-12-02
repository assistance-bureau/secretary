<script lang="ts">
    import { onMount } from 'svelte';
    let weatherData = null;
    let airQuality = null;

    onMount(async () => {
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=37.517&lon=127.04&appid=8fcd09e0f165f5bcf870ec203b83ae6c');
        weatherData = await response.json();
        weatherData.main.temp = Math.round(weatherData.main.temp - 273.15);
        const airPollutionResponse = await fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=37.517&lon=127.04&appid=8fcd09e0f165f5bcf870ec203b83ae6c');
        const airPollutionData = await airPollutionResponse.json();
        airQuality = airPollutionData.list[0].main.aqi; // 대기 질 지수
    });

    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
    let tabSet: number = 0;

</script>
			
<div class="flex flex-col items-center justify-center h-full">
    {#if weatherData}
        <div class="weather-icon">
        {#if weatherData.weather[0].main === 'Clear'}
            <i class="fa-solid fa-sun icon clear text-4xl animate-spin-slow"></i>
        {/if}
        {#if weatherData.weather[0].main === 'Clouds'}
            <i class="fa-solid fa-cloud icon clouds text-4xl animate-pulse-slow"></i>
        {/if}
        {#if weatherData.weather[0].main === 'Rain'}
            <i class="fa-solid fa-cloud-rain icon rain text-4xl animate-bounce-soft"></i>
        {/if}
        {#if weatherData.weather[0].main === 'Snow'}
            <i class="fa-solid fa-snowflake icon snow text-4xl animate-bounce-soft"></i>
        {/if}
        {#if weatherData.weather[0].main === 'Mist'}
            <i class="fa-solid fa-smog icon mist text-4xl animate-pulse"></i>
        {/if}
        {#if weatherData.weather[0].main === 'Thunderstorm'}
            <i class="fa-solid fa-bolt icon thunderstorm text-4xl animate-ping-soft"></i>
        {/if}
      
      </div>
      <p class="text-3xl mt-4">{weatherData.main.temp}°C</p>
      <p class="mt-2">습도: {weatherData.main.humidity}%</p>
      <p>풍속: {weatherData.wind.speed} m/s</p>
      {#if airQuality}
      <p>공기질: 
        {#if airQuality === 1}
          좋음
        {:else if airQuality === 2}
          보통
        {:else if airQuality === 3}
          보통
        {:else if airQuality === 4}
          나쁨
        {:else if airQuality === 5}
          매우 나쁨
        {/if}
      </p>
    {/if}
    {:else}
      <div>Loading...</div>
    {/if}
  </div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer utilities {
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 12s linear infinite;
    }
  }
  @keyframes bounce-soft {
      0%, 100% {
        transform: translateY(-5%); /* 움직임 범위 감소 */
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }
    .animate-bounce-soft {
      animation: bounce-soft 1s infinite;
    }
    @keyframes ping-soft {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      75%, 100% {
        transform: scale(1.0); /* 확산 범위 감소 */
        opacity: 0;
      }
    }
    .animate-ping-soft {
      animation: ping-soft 1s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    @keyframes pulse-slow {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
      .animate-pulse-slow {
        animation: pulse-slow 2s infinite;
      }
</style>
  